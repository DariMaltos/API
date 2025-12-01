// src/routes/clientes.js
const express = require('express');
const { obtenerClientes } = require('../controllers/clientesController');

const router = express.Router();

// GET /api/clientes
router.get('/', obtenerClientes);

module.exports = router;
