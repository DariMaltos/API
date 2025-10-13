import express from "express";
import cors from "cors";
import bearerToken from "express-bearer-token";

const app = express();
const PORT = 3000;
const TOKEN_VALIDO = "12345"; 

// --- Middlewares base ---
app.use(cors());
app.use(express.json());
app.use(bearerToken());

// --- Middleware de autenticación ---
app.use((req, res, next) => {
  console.log("Token recibido:", req.token);

  if (req.token === TOKEN_VALIDO) {
    next(); // Token válido
  } else {
    res.status(401).json({ mensaje: "No autorizado" });
  }
});

// --- Ruta protegida ---
app.get("/api/datos", (req, res) => {
  res.json({ mensaje: "Acceso permitido con Bearer Token" });
});

// --- Ruta no encontrada ---
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// --- Manejador de errores ---
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});

// --- Iniciar servidor ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
