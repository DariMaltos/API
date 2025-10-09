import express from "express";
import cors from "cors";

import clientesRouter from "./rutas/clientes.js";
import proveedoresRouter from "./rutas/proveedores.js";

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/clientes", clientesRouter);
app.use("/proveedores", proveedoresRouter);

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error); // lo manda al manejador de errores
});

// Middleware de manejo de errores 
app.use((err, req, res, next) => {
  console.error(` Error: ${err.message}`);
  res.status(err.status || 500).json({
    ok: false,
    error: err.message || "Error interno del servidor",
  });
});

app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});
