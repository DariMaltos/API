import { Router } from "express";

const router = Router();

router.get("/", (req, res) =>
  res.json({ metodo: "GET", mensaje: "Hola desde GET /clientes" })
);

router.post("/", (req, res) =>
  res.json({ metodo: "POST", mensaje: "Recibido en /clientes", body: req.body })
);

router.get("/prueba-error", (req, res, next) => {
  const err = new Error("Error de prueba dentro de /clientes");
  err.status = 500;
  next(err);
});

export default router;
