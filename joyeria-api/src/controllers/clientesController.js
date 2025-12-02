const pool = require('../db');

// GET /api/clientes  -> todos los clientes
async function obtenerClientes(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (err) {
    console.error('Error en obtenerClientes:', err);
    res.status(500).json({ error: 'Error al consultar clientes' });
  }
}

// GET /api/clientes/:id  -> cliente por id
async function obtenerClientePorId(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error en obtenerClientePorId:', err);
    res.status(500).json({ error: 'Error al consultar cliente' });
  }
}

// POST /api/clientes  -> crear cliente
async function crearCliente(req, res) {
  const { nombre, telefono, email } = req.body;

  if (!nombre || !telefono || !email) {
    return res.status(400).json({
      error: 'nombre, telefono y email son obligatorios',
    });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO clientes (nombre, telefono, email) VALUES (?, ?, ?)',
      [nombre, telefono, email]
    );

    res.status(201).json({
      id: result.insertId,
      nombre,
      telefono,
      email,
    });
  } catch (err) {
    console.error('Error en crearCliente:', err);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
}

// PUT /api/clientes/:id  -> actualizar cliente
async function actualizarCliente(req, res) {
  const { id } = req.params;
  const { nombre, telefono, email } = req.body;

  if (!nombre || !telefono || !email) {
    return res.status(400).json({
      error: 'nombre, telefono y email son obligatorios',
    });
  }

  try {
    const [result] = await pool.query(
      'UPDATE clientes SET nombre = ?, telefono = ?, email = ? WHERE id = ?',
      [nombre, telefono, email, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json({
      id: Number(id),
      nombre,
      telefono,
      email,
    });
  } catch (err) {
    console.error('Error en actualizarCliente:', err);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
}

// DELETE /api/clientes/:id  -> eliminar cliente
async function eliminarCliente(req, res) {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM clientes WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (err) {
    console.error('Error en eliminarCliente:', err);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
}

module.exports = {
  obtenerClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
};
