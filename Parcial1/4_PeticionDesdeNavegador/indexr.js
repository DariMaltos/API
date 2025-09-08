import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

// Activa CORS
//app.use(cors());

// Ruta simple
app.get("/clientes", (req, res) => {
  res.send("Hola desde GET /clientes");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
