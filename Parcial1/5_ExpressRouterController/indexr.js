import express from "express";
import cors from "cors";
import { routerCli } from "./rutas/clientes.js"; 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/clientes", routerCli);

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
