import { Router } from "express";
import { obtenerClientes } from "../controladores/clientesController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Operaciones del recurso Clientes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Ana López"
 *         telefono:
 *           type: string
 *           example: "8112345678"
 *         correo:
 *           type: string
 *           example: "ana@correo.com"
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Error al consultar clientes"
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtiene los clientes
 *     description: Muestra todos los clientes o uno solo si se envía el parámetro `id` en la URL.  
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         description: ID del cliente (opcional)
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida correctamente
 *       500:
 *         description: Error al consultar clientes
 */
router.get("/", obtenerClientes);

export default router;
