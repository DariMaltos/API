import { Router } from "express";

const router = Router();

router.get("/", (req, res) =>
  res.json({ metodo: "GET", mensaje: "Hola desde GET /proveedores" })
);

router.post("/", (req, res) =>
  res.json({ metodo: "POST", mensaje: "Recibido en /proveedores", body: req.body })
);

export default router;