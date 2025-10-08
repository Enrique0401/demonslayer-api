import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import personajesRoutes from "./src/routes/personajes.js";

// --- Solución: crear __dirname manualmente ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ---------------------------------------------

const app = express();

// Servir tus imágenes estáticas desde /src/public
app.use("/public", express.static(path.join(__dirname, "src/public")));

// Permitir solicitudes desde Angular o navegador
app.use(cors());

// Permitir recibir JSON en el body de las peticiones
app.use(express.json());

// Rutas principales
app.use("/api/personajes", personajesRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🔥 API Demon Slayer corriendo en http://localhost:${PORT}`)
);
