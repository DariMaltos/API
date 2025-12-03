const pool = require('../db');

// GET /api/joyas
async function obtenerJoyas(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM joyas');
    res.json(rows);
  } catch (err) {
    console.error('Error en obtenerJoyas:', err);
    res.status(500).json({ error: 'Error al consultar joyas' });
  }
}

// GET /api/joyas/:id
async function obtenerJoyaPorId(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM joyas WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Joya no encontrada' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error en obtenerJoyaPorId:', err);
    res.status(500).json({ error: 'Error al consultar joya' });
  }
}

// POST /api/joyas
async function crearJoya(req, res) {
  const { sku, nombre, tipo, material, talla, precio, stock } = req.body;

  // Para CRUD simple, solo validamos lo básico
  if (!sku || !nombre || !precio) {
    return res.status(400).json({
      error: 'sku, nombre y precio son obligatorios',
    });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO joyas (sku, nombre, tipo, material, talla, precio, stock, creado_en)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [sku, nombre, tipo || null, material || null, talla || null, precio, stock || 0]
    );

    res.status(201).json({
      id: result.insertId,
      sku,
      nombre,
      tipo: tipo || null,
      material: material || null,
      talla: talla || null,
      precio,
      stock: stock || 0,
      // creado_en lo puedes consultar después si lo necesitas
    });
  } catch (err) {
    console.error('Error en crearJoya:', err);
    res.status(500).json({ error: 'Error al crear joya' });
  }
}

// PUT /api/joyas/:id
async function actualizarJoya(req, res) {
  const { id } = req.params;
  const { sku, nombre, tipo, material, talla, precio, stock } = req.body;

  if (!sku || !nombre || !precio) {
    return res.status(400).json({
      error: 'sku, nombre y precio son obligatorios',
    });
  }

  try {
    const [result] = await pool.query(
      `UPDATE joyas
       SET sku = ?, nombre = ?, tipo = ?, material = ?, talla = ?, precio = ?, stock = ?
       WHERE id = ?`,
      [sku, nombre, tipo || null, material || null, talla || null, precio, stock || 0, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Joya no encontrada' });
    }

    res.json({
      id: Number(id),
      sku,
      nombre,
      tipo: tipo || null,
      material: material || null,
      talla: talla || null,
      precio,
      stock: stock || 0,
    });
  } catch (err) {
    console.error('Error en actualizarJoya:', err);
    res.status(500).json({ error: 'Error al actualizar joya' });
  }
}

// PATCH /api/joyas/:id  -> actualización parcial
async function actualizarJoyaParcial(req, res) {
  const { id } = req.params;
  const { sku, nombre, tipo, material, talla, precio, stock } = req.body;

  try {
    const campos = [];
    const valores = [];

    if (sku !== undefined) {
      campos.push('sku = ?');
      valores.push(sku);
    }
    if (nombre !== undefined) {
      campos.push('nombre = ?');
      valores.push(nombre);
    }
    if (tipo !== undefined) {
      campos.push('tipo = ?');
      valores.push(tipo);
    }
    if (material !== undefined) {
      campos.push('material = ?');
      valores.push(material);
    }
    if (talla !== undefined) {
      campos.push('talla = ?');
      valores.push(talla);
    }
    if (precio !== undefined) {
      campos.push('precio = ?');
      valores.push(precio);
    }
    if (stock !== undefined) {
      campos.push('stock = ?');
      valores.push(stock);
    }

    if (campos.length === 0) {
      return res.status(400).json({
        error: 'No se enviaron campos para actualizar',
      });
    }

    const sql = `UPDATE joyas SET ${campos.join(', ')} WHERE id = ?`;
    valores.push(id);

    const [result] = await pool.query(sql, valores);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Joya no encontrada' });
    }

    res.json({
      message: 'Joya actualizada parcialmente',
      id: Number(id),
    });
  } catch (err) {
    console.error('Error en actualizarJoyaParcial:', err);
    res.status(500).json({ error: 'Error al actualizar joya parcialmente' });
  }
}


// DELETE /api/joyas/:id
async function eliminarJoya(req, res) {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM joyas WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Joya no encontrada' });
    }

    res.json({ message: 'Joya eliminada correctamente' });
  } catch (err) {
    console.error('Error en eliminarJoya:', err);
    res.status(500).json({ error: 'Error al eliminar joya' });
  }
}

module.exports = {
  obtenerJoyas,
  obtenerJoyaPorId,
  crearJoya,
  actualizarJoya,
  actualizarJoyaParcial,
  eliminarJoya,
};
