// controladores/clientesController.js
import mysql from "mysql2/promise";

// conexión a la BD 
const connection = await mysql.createConnection({
  host: "localhost",      
  user: "root",
  password: "",           
  database: "joyeria_api",
  port: 3306,
});

export async function obtenerClientes(req, res) {
  let consultaSql;
  let params = [];

  if (typeof req.query.id === "undefined") {
    // sin id 
    consultaSql = "SELECT * FROM clientes";
  } else {
    // con id 
    consultaSql = "SELECT * FROM clientes WHERE id = ?";
    params = [req.query.id];
  }

  try {
    const [results] = await connection.query(consultaSql, params);
    res.json(results);
  } catch (err) {
    console.error("Error en obtenerClientes:", err);
    res.status(500).json({ error: "Error al consultar clientes" });
  }
}
