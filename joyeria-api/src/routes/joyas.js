// src/routes/joyas.js
const express = require('express');
const { obtenerJoyas } = require('../controllers/joyasController');

const router = express.Router();

// GET /api/joyas
router.get('/', obtenerJoyas);

module.exports = router;
