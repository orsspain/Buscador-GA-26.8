# Jugadores Anónimos (J.A. España - Área 21)

Aplicación web progresiva (PWA) de la comunidad de autoayuda de **Jugadores Anónimos en España (Área 21)** y países de habla hispana. Diseñada para brindar apoyo inmediato, acceso a reuniones presenciales y virtuales por Zoom, literatura oficial aprobada de recuperación, autodiagnóstico de 20 preguntas y asistencia inteligente 24 horas.

---

## 🌟 Características Principales

### 1. 🔍 Directorio y Buscador de Reuniones
- **Reuniones Presenciales**: Directorio organizado por comunidades autónomas, provincias y ciudades en España y Latinoamérica (Madrid, Barcelona, Valencia, Sevilla, Cantabria, Albacete, Alicante, etc.).
- **Salas Virtuales por Zoom**: Acceso directo y filtrado por día y hora para conectarse a reuniones online los 7 días de la semana.
- **Geolocalización ("Cerca de mí")**: Búsqueda automática de grupos cercanos mediante coordenadas o filtros por región.
- **Favoritos**: Guardado local de reuniones frecuentes para acceso instantáneo.

### 2. 📖 Literatura Oficial y Herramientas de Recuperación
- **Página 17 de 'El Combo'**: Los 8 principios de acción diaria para mantener la abstinencia y vivir en recuperación un día a la vez.
- **Las 20 Preguntas de Autoevaluación**: Test interactivo oficial con contador de respuestas afirmativas (7 o más indican juego compulsivo).
- **Los 12 Pasos de Recuperación y los 12 Pasos de Unidad**: Explicación detallada de cada paso.
- **Contador 'Solo por Hoy'**: Registro y cálculo de días limpios de juego con las fichas de serenidad (24 horas, 30 días, 90 días, 1 año).
- **Junta del Grupo de Alivio de la Presión (G.A.P.)**: Guías para la reorganización financiera, moratoria con acreedores y presupuesto familiar.
- **Manual de Padrinazgo**: Principios de la relación padrino-ahijado bajo la fórmula HMD (Honestidad, Mente abierta y Disposición).
- **Bolsa de Valores e Inversiones**: Pautas sobre el mercado bursátil, jubilación y manejo de activos.

### 3. 🤖 Asistente Virtual Inteligente
- Asistente empático entrenado con la literatura oficial aprobada de Jugadores Anónimos.
- Búsqueda contextual (RAG) en los folletos y libros oficiales del Área 21.
- Botones de acción rápida en las respuestas para dirigir a reuniones, test o teléfonos de ayuda.
- Motor de contingencia autónomo para responder incluso en situaciones sin conexión o límite de API.

### 4. 🚨 Protocolo y Ayuda de Emergencia 24h
- Botón de llamada directa al teléfono de asistencia 24h: **+34 670 691 513**.
- Protocolo de contención ante impulsos urgentes de juego (técnica de los 10 minutos, cambio de diapositiva mental, fórmula HALT).
- Teléfonos de contacto por provincias y enlaces a **Gam-Anon** para familiares y parejas.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React / Google Material Symbols.
- **Animaciones**: `motion` (`motion/react`).
- **Backend / Servidor**: Express con middleware Vite (`server.ts`).
- **Inteligencia Artificial**: Google Gen AI SDK (`@google/genai`) con modelos Gemini.
- **PWA**: Web App Manifest (`manifest.json`), meta tags móviles e iconos adaptativos.

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- Node.js 18+ o Bun.

### 1. Clonar e Instalar Dependencias
```bash
npm install
```

### 2. Variables de Entorno
Copia el archivo de ejemplo y configura tu clave de API si deseas habilitar Gemini:
```bash
cp .env.example .env
```
Dentro de `.env`:
```env
GEMINI_API_KEY=tu_clave_de_gemini_aqui
```

### 3. Modo Desarrollo
```bash
npm run dev
```
La aplicación se ejecutará en `http://localhost:3000`.

### 4. Compilación para Producción
```bash
npm run build
npm start
```

---

## 📱 Instalación como App (PWA)

La aplicación cuenta con soporte para ser instalada directamente en dispositivos móviles (Android / iOS) o en el escritorio mediante el navegador:
1. Abre la web en tu navegador móvil (Chrome, Safari, Edge, etc.).
2. Selecciona **"Añadir a la pantalla de inicio"** o **"Instalar aplicación"**.
3. Accede a la aplicación con vista nativa a pantalla completa y accesos directos.

---

## 📞 Contacto y Enlaces Oficiales

- **Teléfono 24 Horas**: +34 670 691 513
- **Sitio Web Oficial**: [www.jugadoresanonimos.org](https://www.jugadoresanonimos.org)
- **Correo Electrónico**: oficina@jugadoresanonimos.org
- **Gam-Anon (Familiares)**: [www.gam-anon.com](https://www.gam-anon.com) | +34 677 788 304
- **Oficina Regional de Servicio (ORS España)**: Apartado Postal 1002, 39080 Santander (Cantabria).

---

*“Dios, concédeme la Serenidad para aceptar las cosas que no puedo cambiar, Valor para cambiar las cosas que sí puedo, y Sabiduría para reconocer la diferencia.”*
