import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3000;

// Carpeta de destino
const carpeta = path.resolve("./archivos");
if (!fs.existsSync(carpeta)) fs.mkdirSync(carpeta);

// Configuración simple de Multer (nombres únicos)
const upload = multer({
  dest: carpeta
});

// Ruta POST básica
app.post("/subir", upload.single("archivo"), (req, res) => {
  res.json({
    mensaje: "Archivo recibido",
    campos: req.body,
    archivo: req.file
  });
});

// Inicio
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
