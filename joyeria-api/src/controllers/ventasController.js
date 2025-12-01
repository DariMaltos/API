// src/controllers/ventasController.js
const pool = require('../db');

// GET /api/ventas  (opcional ?id_venta=)
async function obtenerVentas(req, res) {
  let sql;
  let params = [];

  if (typeof req.query.id_venta === 'undefined') {
    sql = 'SELECT * FROM ventas';
  } else {
    sql = 'SELECT * FROM ventas WHERE id_venta = ?';
    params = [req.query.id_venta];
  }

  try {
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('Error en obtenerVentas:', err);
    res.status(500).json({ error: 'Error al consultar ventas' });
  }
}

module.exports = {
  obtenerVentas
};
