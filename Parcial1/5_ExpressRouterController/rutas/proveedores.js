import { Router } from "express";
import { obtenerProveedores, altaProveedores } from "../controladores/proveedoresController.js";

const router = Router();

router.get("/", (req, res) => {
  obtenerProveedores(req, res);
});

router.post("/", (req, res) => {
  altaProveedores(req, res);
});

export { router as routerProv };
