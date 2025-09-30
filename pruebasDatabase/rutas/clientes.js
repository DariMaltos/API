// rutas/clientes.routes.js
import { Router } from "express";
import { obtenerClientes } from "../controladores/clientesController.js";

const router = Router();

// GET /clientes           → lista todos
// GET /clientes?id=1      → lista solo el cliente con id=1
router.get("/", obtenerClientes);

export default router;
