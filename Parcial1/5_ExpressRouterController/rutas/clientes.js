import { Router } from "express";
import { obtenerClientes, altaClientes } from "../controladores/clientesController.js";

const router = Router();

// SOLO GET si así lo pide tu profe:
router.get("/", obtenerClientes);

// Si quieres dejar el POST como placeholder (no falla si alguien lo llama)
router.post("/", altaClientes);

export { router as routerCli }; 
