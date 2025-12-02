const express = require('express');
const {
  obtenerClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} = require('../controllers/clientesController');

const router = express.Router();

// GET /api/clientes
router.get('/', obtenerClientes);

// GET /api/clientes/:id
router.get('/:id', obtenerClientePorId);

// POST /api/clientes
router.post('/', crearCliente);

// PUT /api/clientes/:id
router.put('/:id', actualizarCliente);

// DELETE /api/clientes/:id
router.delete('/:id', eliminarCliente);

module.exports = router;
