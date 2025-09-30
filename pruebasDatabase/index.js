// index.js
import express from "express";
import cors from "cors";

// IMPORTA y MONTA el router de clientes (ajusta la ruta si tu carpeta difiere)
import clientesRouter from "./rutas/clientes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// endpoint de prueba
app.get("/", (req, res) => {
  res.send("API de Joyería funcionando");
});

// monta /clientes
app.use("/clientes", clientesRouter);

// ¡esto mantiene vivo el server!
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
