import express from "express";
import clientesRouter from "./rutas/clientes.js";
import proveedoresRouter from "./rutas/proveedores.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Montar routers
app.use("/clientes", clientesRouter);
app.use("/proveedores", proveedoresRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
