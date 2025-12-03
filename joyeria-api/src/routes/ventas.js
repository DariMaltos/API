const express = require('express');
const {
  obtenerVentas,
  obtenerVentaPorId,
  crearVenta,
  actualizarVenta,
  eliminarVenta,
  actualizarVentaParcial,    
} = require('../controllers/ventasController');

const router = express.Router();

// GET /api/ventas
router.get('/', obtenerVentas);

// GET /api/ventas/:id_venta
router.get('/:id_venta', obtenerVentaPorId);

// POST /api/ventas
router.post('/', crearVenta);

// PUT /api/ventas/:id_venta
router.put('/:id_venta', actualizarVenta);

// PATCH /api/ventas/:id_venta
router.patch('/:id_venta', actualizarVentaParcial);  

// DELETE /api/ventas/:id_venta
router.delete('/:id_venta', eliminarVenta);

module.exports = router;
