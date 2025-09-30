export function guardarArchivo(req, res) {
  // Multer pone el archivo en req.file y los campos de texto en req.body
  console.log(`Archivo recibido: ${req.file?.originalname || "ninguno"}`);
  console.log("Campos:", req.body);

  return res.json({
    ok: true,
    mensaje: "Formulario de cliente recibido",
    campos: req.body,
    archivo: req.file   // incluye originalname, mimetype, size, path, etc.
  });
}