import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";

import clientesRouter from "./rutas/clientes.js";
import proveedoresRouter from "./rutas/proveedores.js";

const app = express();
const port = 3000;

// Crear la carpeta log 
const logDirectory = path.join(process.cwd(), "log");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Crear stream de escritura para access.log
const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" } // esto es para el append, se agrega en lugar de q se sobreescriba 
);

// Middlewares
app.use(cors());
app.use(morgan("combined", { stream: accessLogStream })); // guarda en access.log
app.use(morgan("dev")); // para q lo siga mostrando en consola



// Rutas
app.use("/clientes", clientesRouter);
app.use("/proveedores", proveedoresRouter);



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
