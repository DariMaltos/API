// index.js
import express from "express";
import cors from "cors";
import clientesRouter from "./rutas/clientes.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js"; // ruta desde pruebasDatabase a raíz

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// rutas de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-spec", (_req, res) => res.json(swaggerSpec)); // opcional

// endpoint de prueba
app.get("/", (_req, res) => {
  res.send("API de Joyería funcionando");
});

// monta /clientes
app.use("/clientes", clientesRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Swagger UI en http://localhost:${PORT}/api-docs`);
});
