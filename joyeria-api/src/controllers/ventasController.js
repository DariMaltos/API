const pool = require('../db');

// GET /api/ventas
async function obtenerVentas(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM ventas');
    res.json(rows);
  } catch (err) {
    console.error('Error en obtenerVentas:', err);
    res.status(500).json({ error: 'Error al consultar ventas' });
  }
}

// GET /api/ventas/:id_venta
async function obtenerVentaPorId(req, res) {
  const { id_venta } = req.params;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM ventas WHERE id_venta = ?',
      [id_venta]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error en obtenerVentaPorId:', err);
    res.status(500).json({ error: 'Error al consultar venta' });
  }
}

// POST /api/ventas
async function crearVenta(req, res) {
  const {
    id_joya,
    id_cliente,
    cantidad,
    precio_unit,
    total,
    fecha,
    nota,
  } = req.body;

  if (!id_joya || !id_cliente || !cantidad || !precio_unit || !total) {
    return res.status(400).json({
      error: 'id_joya, id_cliente, cantidad, precio_unit y total son obligatorios',
    });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO ventas (id_joya, id_cliente, cantidad, precio_unit, total, fecha, nota)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id_joya,
        id_cliente,
        cantidad,
        precio_unit,
        total,
        fecha || new Date(),
        nota || null,
      ]
    );

    res.status(201).json({
      id_venta: result.insertId,
      id_joya,
      id_cliente,
      cantidad,
      precio_unit,
      total,
      fecha: fecha || new Date(),
      nota: nota || null,
    });
  } catch (err) {
    console.error('Error en crearVenta:', err);
    res.status(500).json({ error: 'Error al crear venta' });
  }
}

// PUT /api/ventas/:id_venta
async function actualizarVenta(req, res) {
  const { id_venta } = req.params;
  const {
    id_joya,
    id_cliente,
    cantidad,
    precio_unit,
    total,
    fecha,
    nota,
  } = req.body;

  if (!id_joya || !id_cliente || !cantidad || !precio_unit || !total) {
    return res.status(400).json({
      error: 'id_joya, id_cliente, cantidad, precio_unit y total son obligatorios',
    });
  }

  try {
    const [result] = await pool.query(
      `UPDATE ventas
       SET id_joya = ?, id_cliente = ?, cantidad = ?, precio_unit = ?, total = ?, fecha = ?, nota = ?
       WHERE id_venta = ?`,
      [
        id_joya,
        id_cliente,
        cantidad,
        precio_unit,
        total,
        fecha || new Date(),
        nota || null,
        id_venta,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    res.json({
      id_venta: Number(id_venta),
      id_joya,
      id_cliente,
      cantidad,
      precio_unit,
      total,
      fecha: fecha || new Date(),
      nota: nota || null,
    });
  } catch (err) {
    console.error('Error en actualizarVenta:', err);
    res.status(500).json({ error: 'Error al actualizar venta' });
  }
}

// PATCH /api/ventas/:id_venta  -> actualización parcial
async function actualizarVentaParcial(req, res) {
  const { id_venta } = req.params;
  const {
    id_joya,
    id_cliente,
    cantidad,
    precio_unit,
    total,
    fecha,
    nota,
  } = req.body;

  try {
    const campos = [];
    const valores = [];

    if (id_joya !== undefined) {
      campos.push('id_joya = ?');
      valores.push(id_joya);
    }
    if (id_cliente !== undefined) {
      campos.push('id_cliente = ?');
      valores.push(id_cliente);
    }
    if (cantidad !== undefined) {
      campos.push('cantidad = ?');
      valores.push(cantidad);
    }
    if (precio_unit !== undefined) {
      campos.push('precio_unit = ?');
      valores.push(precio_unit);
    }
    if (total !== undefined) {
      campos.push('total = ?');
      valores.push(total);
    }
    if (fecha !== undefined) {
      campos.push('fecha = ?');
      valores.push(fecha);
    }
    if (nota !== undefined) {
      campos.push('nota = ?');
      valores.push(nota);
    }

    if (campos.length === 0) {
      return res.status(400).json({
        error: 'No se enviaron campos para actualizar',
      });
    }

    const sql = `UPDATE ventas SET ${campos.join(', ')} WHERE id_venta = ?`;
    valores.push(id_venta);

    const [result] = await pool.query(sql, valores);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    res.json({
      message: 'Venta actualizada parcialmente',
      id_venta: Number(id_venta),
    });
  } catch (err) {
    console.error('Error en actualizarVentaParcial:', err);
    res.status(500).json({ error: 'Error al actualizar venta parcialmente' });
  }
}


// DELETE /api/ventas/:id_venta
async function eliminarVenta(req, res) {
  const { id_venta } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM ventas WHERE id_venta = ?',
      [id_venta]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    res.json({ message: 'Venta eliminada correctamente' });
  } catch (err) {
    console.error('Error en eliminarVenta:', err);
    res.status(500).json({ error: 'Error al eliminar venta' });
  }
}

module.exports = {
  obtenerVentas,
  obtenerVentaPorId,
  crearVenta,
  actualizarVenta,
  actualizarVentaParcial,
  eliminarVenta,
};
