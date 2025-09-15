import express from "express";
import { guardarArchivo } from "../controller/clienteController.js";

const router = express.Router();

// POST /cliente (req.file y req.body ya están listos por Multer)
router.post("/", (req, res) => guardarArchivo(req, res));

export default router;
