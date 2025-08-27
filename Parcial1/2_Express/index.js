import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => res.json({ metodo: "GET", mensaje: "Hola desde GET /" }));
app.post("/", (req, res) => res.json({ metodo: "POST", mensaje: "Recibido en /", body: req.body }));
app.put("/",  (req, res) => res.json({ metodo: "PUT",  mensaje: "Actualización en /", body: req.body }));
app.delete("/", (req, res) => res.json({ metodo: "DELETE", mensaje: "Eliminado en /" }));

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
