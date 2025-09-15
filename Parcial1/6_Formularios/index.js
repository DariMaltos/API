import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import routerCliente from "./rutas/cliente.js";

// carpeta donde Multer guardará los archivos
const carpeta = path.resolve("./archivos");
if (!fs.existsSync(carpeta)) fs.mkdirSync(carpeta, { recursive: true });

// Multer como middleware global (campo 'archivo')
const upload = multer({ dest: carpeta });

const app = express();
const PORT = 3000;

// aplica el parser multipart antes de las rutas
app.use(upload.single("archivo"));

// monta rutas
app.use("/cliente", routerCliente);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
