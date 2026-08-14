import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily/safely
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } catch (err) {
      console.warn("Failed to initialize Gemini AI client:", err);
    }
  }

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Assistant Chat Endpoint
  app.post("/api/assistant/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "El mensaje es requerido" });
      }

      const systemInstruction = `Eres el Asistente Virtual empático y solidario de Jugadores Anónimos (JA / Gamblers Anonymous) en español.
Tu misión es apoyar a personas que buscan recuperarse de la ludopatía o adicción al juego, a sus familiares, o a personas que desean conocer más sobre Jugadores Anónimos.

Principios fundamentales que debes transmitir:
1. No juzgar, ser compasivo, cálido y claro.
2. El único requisito para ser miembro de J.A. es el deseo de dejar de jugar.
3. El lema clave: "Un día a la vez", "Solo por hoy".
4. Si la persona está en una crisis urgente o tiene deseos intensos de jugar:
   - Recuérdale que no está sola.
   - Invítala a llamar a la línea de ayuda 24 horas: +34 670 691 513 (o la línea de su país).
   - Sugiérele conectarse a una reunión online por Zoom o llamar a un compañero/padrino.
   - Recomiéndale no llevar dinero ni frecuentar lugares de juego.
5. Conocimiento de la literatura de JA:
   - "El Combo" (Guía para todos los miembros, Página 17).
   - Las 20 preguntas de autodiagnóstico (la mayoría de los miembros responde sí al menos a 7).
   - Los 12 Pasos de Recuperación y los 12 Pasos de Unidad.
6. Reuniones presenciales y online gratuitas y anónimas en España y países de habla hispana (Colombia, México, Argentina, Chile, etc.).
7. Mantén tus respuestas claras, humanas, en párrafos estructurados y reconfortantes.`;

      if (ai) {
        // Build contents for Gemini
        const formattedHistory = Array.isArray(history)
          ? history.slice(-8).map((h: { role: string; content: string }) => ({
              role: h.role === "assistant" ? "model" : "user",
              parts: [{ text: h.content }],
            }))
          : [];

        const chat = ai.chats.create({
          model: "gemini-3.7-flash",
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        // If history is provided, we can either use chat or generateContent with conversation context
        const contents = [
          ...formattedHistory,
          { role: "user", parts: [{ text: message }] },
        ];

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = response.text || "Estoy aquí para acompañarte en tu recuperación. ¿Te gustaría buscar una reunión o hablar sobre algún tema en específico?";
        return res.json({ reply });
      }

      // Smart fallback if no API key is available
      const lower = message.toLowerCase();
      let fallbackReply = "Hola. En Jugadores Anónimos estamos para apoyarte. No estás solo en este camino y la recuperación es posible un día a la vez.";

      if (lower.includes("urgencia") || lower.includes("urgente") || lower.includes("crisis") || lower.includes("jugar ya") || lower.includes("ganas de jugar")) {
        fallbackReply = "Entiendo por lo que estás pasando. Por favor, respira profundo y recuerda: el deseo pasará. Llama ahora mismo al teléfono de Ayuda 24 Horas (+34 670 691 513) o conéctate a una reunión de Zoom activa. No te quedes a solas con las ganas.";
      } else if (lower.includes("reunion") || lower.includes("reunión") || lower.includes("zoom") || lower.includes("cerca")) {
        fallbackReply = "Tenemos reuniones presenciales en múltiples ciudades y reuniones online continuas por Zoom todos los días. Puedes explorar la pestaña 'Reuniones' o la sección 'Zoom' en el menú principal para ver los horarios y enlaces directos.";
      } else if (lower.includes("20 preguntas") || lower.includes("problema") || lower.includes("ludopat") || lower.includes("adicto")) {
        fallbackReply = "Jugadores Anónimos cuenta con un cuestionario de 20 preguntas de autoevaluación. La mayoría de los jugadores compulsivos responden afirmativamente al menos a 7 de ellas. Puedes realizar el cuestionario interactivo en la sección de Literatura y Autodiagnóstico de esta app.";
      } else if (lower.includes("12 pasos") || lower.includes("pasos")) {
        fallbackReply = "El programa de Jugadores Anónimos se basa en 12 Pasos de Recuperación que ayudan a reconstruir la vida emocional, familiar y financiera. El Paso 1 es admitir nuestra impotencia ante el juego y que nuestras vidas se habían vuelto ingobernables.";
      }

      return res.json({ reply: fallbackReply });
    } catch (err: any) {
      console.error("Error in /api/assistant/chat:", err);
      return res.json({
        reply: "Estoy aquí para apoyarte. Recuerda que no estás solo. Si necesitas ayuda urgente, puedes llamar al teléfono de atención 24h: +34 670 691 513.",
      });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
