import { Router } from "express";
import { body, param, validationResult } from "express-validator";

const router = Router();

// Middleware para revisar errores
const validar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errores: errors.array().map(e => ({
        campo: e.path,
        msg: e.msg,
        valor: e.value
      }))
    });
  }
  next();
};

// Ruta GET /clientes/:id (valida parámetro)
router.get(
  "/:id",
  [
    param("id")
      .isInt({ min: 1 }).withMessage("El id debe ser un número entero positivo")
  ],
  validar,
  (req, res) => {
    res.json({ ok: true, mensaje: `Cliente con id ${req.params.id}` });
  }
);

// Ruta POST /clientes (valida body con encadenamiento)
router.post(
  "/",
  [
    body("nombre")
      .trim()
      .notEmpty().withMessage("El nombre es obligatorio")
      .isLength({ min: 3, max: 60 }).withMessage("El nombre debe tener entre 3 y 60 caracteres"),
    body("email")
      .isEmail().withMessage("Debe ser un correo válido")
      .normalizeEmail(),
    body("edad")
      .optional()
      .isInt({ min: 18, max: 120 }).withMessage("La edad debe ser un número entre 18 y 120"),
    body("activo")
      .optional()
      .isBoolean().withMessage("Debe ser verdadero o falso")
      .toBoolean()
  ],
  validar,
  (req, res) => {
    res.json({
      ok: true,
      mensaje: "Cliente válido",
      datos: req.body
    });
  }
);

export default router;
