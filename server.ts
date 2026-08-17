import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { searchOfficialLiterature, OFFICIAL_LITERATURE, LiteratureEntry } from "./src/data/officialLiterature";

dotenv.config();

// Helper to get or instantiate Gemini AI client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  try {
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI client:", err);
    return null;
  }
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Literature search endpoint
  app.get("/api/literature/search", (req, res) => {
    const q = (req.query.q as string) || "";
    if (!q.trim()) {
      return res.json({ results: OFFICIAL_LITERATURE.slice(0, 8) });
    }
    const results = searchOfficialLiterature(q);
    return res.json({ results });
  });

  // Assistant Chat Endpoint with RAG Search over Official Literature
  app.post("/api/assistant/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({ error: "El mensaje es requerido" });
      }

      const trimmedMessage = message.trim();

      // Search matching literature entries in the official documents
      const matchedDocs = searchOfficialLiterature(trimmedMessage);
      const topDocs = matchedDocs.slice(0, 4);

      let literatureContext = "";
      if (topDocs.length > 0) {
        literatureContext = `\n\n--- LITERATURA OFICIAL DE JUGADORES ANÓNIMOS RELEVANTE PARA ESTA CONSULTA ---\n` +
          topDocs.map((doc: LiteratureEntry) => (
            `【${doc.title}】\n` +
            `Resumen: ${doc.summary}\n` +
            `Citas y Principios Clave:\n${doc.keyQuotes.map((q: string) => ` - "${q}"`).join('\n')}\n` +
            `Detalles y Procedimiento: ${doc.details}\n`
          )).join('\n\n');
      }

      const systemInstruction = `Eres el Asistente Virtual Oficial de la comunidad de Jugadores Anónimos (JA / Gamblers Anonymous) en España (Área 21) y países de habla hispana.
Tu misión principal es responder dudas y orientar basándote SIEMPRE en la LITERATURA OFICIAL APROBADA de Jugadores Anónimos (Folletos del Área 21, Libro Combo y el Libro Azul "Compartiendo la Recuperación").

Directrices fundamentales:
1. Precisión y Fidelidad a la Literatura:
   - Cuando respondas sobre un tema (padrinazgo, impulsos, deudas, pasos, reuniones, bolsa/inversiones, 20 preguntas), fundamenta tu explicación en los documentos oficiales correspondientes (ej. Folleto nº 18, El Combo Pág. 17, Folleto nº 20/24 Grupo de Alivio de la Presión, Folleto nº 46 Mercado de Valores, Libro Azul, etc.).
2. Tono y Enfoque:
   - Cálido, empático, sin juzgar, comprensivo y esperanzador.
   - "Un día a la vez", "Solo por hoy".
   - El único requisito para pertenecer a Jugadores Anónimos es el deseo de dejar de jugar.
3. Situaciones de Urgencia o Crisis:
   - Línea de Ayuda 24 Horas: +34 670 691 513.
   - Recomienda conectarse a reuniones Zoom activas o presenciales.
   - Sugiere medidas de contención de la literatura (no llevar dinero, técnica de los 10 minutos, cambiar la diapositiva mental, llamar a un compañero/padrino).
4. Formato:
   - Respuestas claras, con saltos de línea y viñetas cuando sea oportuno.
   - Cita el folleto o capítulo relevante para que el usuario conozca la fuente oficial.${literatureContext}`;

      const ai = getGeminiClient();

      if (ai) {
        // Sanitize multi-turn history for Gemini:
        // Must start with 'user', alternate between 'user' and 'model', and no consecutive identical roles
        const cleanedHistory: { role: "user" | "model"; parts: [{ text: string }] }[] = [];

        if (Array.isArray(history)) {
          for (const item of history) {
            if (!item || !item.content || typeof item.content !== "string") continue;
            const text = item.content.trim();
            if (!text) continue;

            const role: "user" | "model" =
              item.role === "assistant" || item.role === "model" ? "model" : "user";

            // Gemini multi-turn cannot start with a model message
            if (cleanedHistory.length === 0 && role === "model") {
              continue;
            }

            // Merge if consecutive turns have the same role
            if (
              cleanedHistory.length > 0 &&
              cleanedHistory[cleanedHistory.length - 1].role === role
            ) {
              cleanedHistory[cleanedHistory.length - 1].parts[0].text += `\n\n${text}`;
            } else {
              cleanedHistory.push({
                role,
                parts: [{ text }],
              });
            }
          }
        }

        // If the last history turn is 'user', remove it to avoid consecutive user turns before the new message
        if (
          cleanedHistory.length > 0 &&
          cleanedHistory[cleanedHistory.length - 1].role === "user"
        ) {
          cleanedHistory.pop();
        }

        // Limit history to last 6 turns to keep context fast and focused
        const slicedHistory = cleanedHistory.slice(-6);

        const contents = [
          ...slicedHistory,
          { role: "user" as const, parts: [{ text: trimmedMessage }] },
        ];

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents,
          config: {
            systemInstruction,
            temperature: 0.6,
          },
        });

        const reply = response.text?.trim();
        if (reply) {
          return res.json({
            reply,
            references: topDocs.map((d: LiteratureEntry) => ({
              code: d.code,
              title: d.title,
              summary: d.summary,
            })),
          });
        }
      }

      // Contextual knowledge fallback if Gemini API is unavailable, grounded on official literature
      const lower = trimmedMessage.toLowerCase();
      let fallbackReply =
        "Hola. En Jugadores Anónimos te recibimos con los brazos abiertos. Toda nuestra orientación proviene de la **Literatura Aprobada de Jugadores Anónimos** (El Combo, Libro Azul y Folletos del Área 21).\n\n¿Te gustaría consultar sobre reuniones, padrinazgo, cómo manejar las deudas con la Junta de Alivio de la Presión, o cómo afrontar los impulsos de jugar?";

      if (
        lower.includes("urgente") ||
        lower.includes("urgencia") ||
        lower.includes("crisis") ||
        lower.includes("jugar ya") ||
        lower.includes("ganas de jugar") ||
        lower.includes("impulso") ||
        lower.includes("ansia") ||
        lower.includes("desesperad")
      ) {
        fallbackReply =
          "*(Basado en el **Folleto nº 18: Sugerencias ante los impulsos de jugar** y el **Libro Azul - Cap. 8**)*\n\n" +
          "Por favor, respira profundo. El deseo compulsivo es temporal y pasará si no haces la primera apuesta:\n\n" +
          "• **Regla de los 10 Minutos:** Dite a ti mismo: «Voy a esperar 10 minutos sin jugar». Ocupa ese tiempo. Si el deseo sigue, espera otros 10 minutos.\n" +
          "• **Cambia la diapositiva mental:** Visualiza cosas sanas y queridas (tu familia, trabajo, paz interior) y aparta los pensamientos de juego.\n" +
          "• **Línea de Ayuda 24 Horas:** Llama de inmediato al **+34 670 691 513** para hablar con un compañero de J.A.\n" +
          "• **No lleves dinero ni tarjetas:** Pon barreras entre tú y el dinero en efectivo.\n" +
          "• **Entra en una reunión de Zoom:** Hay salas disponibles todos los días.";
      } else if (
        lower.includes("padrin") ||
        lower.includes("ahijad") ||
        lower.includes("hmd")
      ) {
        fallbackReply =
          "*(Basado en el **Folleto nº 16 y 54: Manual de Padrinazgo** y el **Libro Azul - Cap. 7**)*\n\n" +
          "El padrinazgo es un jugador compulsivo en recuperación ayudando a otro a través de los Doce Pasos:\n\n" +
          "• **Fórmula HMD:** Honestidad, Mente abierta (Mentalidad abierta) y Disposición.\n" +
          "• **Rol del Padrino:** Es un guía con experiencia en el programa. No es un banquero, juez ni psicólogo. No presta dinero ni pide dinero prestado.\n" +
          "• **Recomendación:** Se aconseja que padrino y ahijado sean del mismo sexo para evitar complicaciones.\n" +
          "• **¿Cómo elegirlo?:** Escuchando las terapias en las reuniones y buscando a alguien que tenga la serenidad y recuperación que deseas.";
      } else if (
        lower.includes("deuda") ||
        lower.includes("alivio") ||
        lower.includes("presion") ||
        lower.includes("presión") ||
        lower.includes("acreedor") ||
        lower.includes("banco") ||
        lower.includes("moratoria")
      ) {
        fallbackReply =
          "*(Basado en los **Folletos nº 20, 24 y 25: Junta del Grupo de Alivio de la Presión (G.A.P.)**)*\n\n" +
          "El programa enseña que los problemas de deudas son solucionables cuando se detiene el juego:\n\n" +
          "• **Prioridad de Gastos:** Primero se asegura el sustento y los gastos básicos de la familia y el hogar; lo que queda se destina ordenadamente a las deudas.\n" +
          "• **Moratoria de 30 a 45 días:** Se contacta con los acreedores para informar que se está en recuperación y solicitar un plazo para presentar un plan de pagos realista.\n" +
          "• **Entrega del Control Financiero:** El jugador retira su nombre de tarjetas y cuentas, y delega el manejo del dinero en su cónyuge o familiar de confianza.\n" +
          "• **Orden de Pago:** 1) Cheques sin fondos/riesgo legal; 2) Bancos; 3) Impuestos; 4) Prestamistas/juego; 5) Familiares y amigos.";
      } else if (
        lower.includes("bolsa") ||
        lower.includes("accion") ||
        lower.includes("acciones") ||
        lower.includes("inversi") ||
        lower.includes("jubilaci") ||
        lower.includes("fondo")
      ) {
        fallbackReply =
          "*(Basado en el **Folleto nº 46: El Mercado de Valores, Planes de Jubilación y J.A.**)*\n\n" +
          "• **Operar en Bolsa es Juego:** Comprar y vender acciones, opciones o criptomonedas de forma activa está calificado como **JUEGO** para el jugador compulsivo.\n" +
          "• **Planes de Jubilación:** Son aceptables siempre que el control y las decisiones se cedan al cónyuge o a un gestor profesional de fondos.\n" +
          "• **Cero Cotizaciones:** El miembro no debe seguir precios, índices ni cotizaciones diarias para evitar alimentar la sensación de 'estar en acción'.";
      } else if (
        lower.includes("20 preguntas") ||
        lower.includes("cuestionario") ||
        lower.includes("test") ||
        lower.includes("diagnostico") ||
        lower.includes("autoevaluacion")
      ) {
        fallbackReply =
          "*(Basado en el **Folleto nº 5: Las Veinte Preguntas**)*\n\n" +
          "Las 20 Preguntas son el instrumento oficial de autodiagnóstico de Jugadores Anónimos:\n\n" +
          "• Si una persona responde afirmativamente a **7 o más preguntas**, la experiencia de J.A. indica que tiene las características de un jugador compulsivo.\n" +
          "• Puedes realizar el test interactivo en la pestaña **Favoritos / Literatura** de esta aplicación.";
      } else if (
        lower.includes("12 pasos") ||
        lower.includes("combo") ||
        lower.includes("recuperacion") ||
        lower.includes("unidad")
      ) {
        fallbackReply =
          "*(Basado en el **Folleto nº 4, 7 (El Combo) y Libro Azul**)*\n\n" +
          "El programa de Jugadores Anónimos se estructura en:\n\n" +
          "1. **Los 12 Pasos de Recuperación:** Admitir la impotencia ante el juego (Paso 1), rendición a un Poder Superior (Pasos 2-3), inventario moral y financiero (Paso 4-5), cambio de carácter (Pasos 6-7), reparación de daños (Pasos 8-9) y mantenimiento diario (Pasos 10-12).\n" +
          "2. **Página 17 de El Combo:** Los 8 puntos de autodisciplina diaria, asistencia a reuniones y servicio.\n" +
          "3. **Los 12 Pasos de Unidad:** Principios que protegen la armonía, autonomía y el anonimato de los grupos.";
      }

      return res.json({
        reply: fallbackReply,
        references: topDocs.map((d: LiteratureEntry) => ({
          code: d.code,
          title: d.title,
          summary: d.summary,
        })),
      });
    } catch (err: any) {
      console.error("Error in /api/assistant/chat:", err);
      return res.json({
        reply:
          "Estoy a tu lado. Recuerda que la recuperación es posible un día a la vez.\n\nSi estás pasando por un momento difícil o sientes el impulso de jugar, no dudes en llamar a nuestra **Línea de Ayuda 24 Horas:** **+34 670 691 513** o unirte a una reunión de Zoom activa.",
        references: [],
      });
    }
  });

  // Vite middleware for development vs static build for production
  const isProduction =
    process.env.NODE_ENV === "production" ||
    process.argv[1]?.endsWith("dist/server.cjs") ||
    process.argv[1]?.endsWith("server.cjs");

  if (!isProduction) {
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
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
fix: modelo estable
