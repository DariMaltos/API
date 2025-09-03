import express from "express";

const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Middleware: solo aceptar peticiones entre 8:00 y 17:00
app.use((req, res, next) => {
  const ahora = new Date();
  const hora = ahora.getHours(); 

  if (hora >= 8 && hora < 17) {
    next(); 
  } else {
    res.status(403).send("Petición fuera de horario (permitido 08:00 - 18:00)");
  }
});


app.get("/", (req, res) =>
  res.json({ metodo: "GET", mensaje: "Hola desde GET /" })
);

app.post("/", (req, res) =>
  res.json({ metodo: "POST", mensaje: "Recibido en /",  body: req.body})
);

app.put("/", (req, res) =>
  res.json({ metodo: "PUT", mensaje: "Actualización en /", body: req.body })
);

app.delete("/", (req, res) =>
  res.json({ metodo: "DELETE", mensaje: "Eliminado en /" })
);

// Iniciar servidor
app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
);
