// src/routes/ventas.js
const express = require('express');
const { obtenerVentas } = require('../controllers/ventasController');

const router = express.Router();

// GET /api/ventas
router.get('/', obtenerVentas);

module.exports = router;
