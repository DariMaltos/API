const express = require('express');
const {
  obtenerJoyas,
  obtenerJoyaPorId,
  crearJoya,
  actualizarJoya,
  eliminarJoya,
  actualizarJoyaParcial,   
} = require('../controllers/joyasController');

const router = express.Router();

// GET /api/joyas
router.get('/', obtenerJoyas);

// GET /api/joyas/:id
router.get('/:id', obtenerJoyaPorId);

// POST /api/joyas
router.post('/', crearJoya);

// PUT /api/joyas/:id
router.put('/:id', actualizarJoya);

// PATCH /api/joyas/:id
router.patch('/:id', actualizarJoyaParcial);   

// DELETE /api/joyas/:id
router.delete('/:id', eliminarJoya);

module.exports = router;
