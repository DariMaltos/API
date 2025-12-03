const express = require('express');
const {
  obtenerClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  actualizarClienteParcial,  
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

// PATCH /api/clientes/:id
router.patch('/:id', actualizarClienteParcial);   

// DELETE /api/clientes/:id
router.delete('/:id', eliminarCliente);

module.exports = router;
