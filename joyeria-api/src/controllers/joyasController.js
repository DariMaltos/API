// src/controllers/joyasController.js
const pool = require('../db');

// GET /api/joyas  (opcional ?id=)
async function obtenerJoyas(req, res) {
  let sql;
  let params = [];

  if (typeof req.query.id === 'undefined') {
    sql = 'SELECT * FROM joyas';
  } else {
    sql = 'SELECT * FROM joyas WHERE id = ?';
    params = [req.query.id];
  }

  try {
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('Error en obtenerJoyas:', err);
    res.status(500).json({ error: 'Error al consultar joyas' });
  }
}

module.exports = {
  obtenerJoyas
};
