import mysql from "mysql2/promise";

console.log("Cargando clientesController desde:", import.meta.url);

const connection = await mysql.createConnection({
   host: "localhost",
    user: "apiuser",     
    password: "api123",  
    database: "TALLERBD",
    port: 3306   
});

// GET /clientes
const obtenerClientes = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM CLIENTE");
    res.json(rows);
  } catch (err) {
    console.error("Error al consultar CLIENTE:", err);
    res.status(500).json({ error: "Error al consultar CLIENTE" });
  }
};

// Placeholder para el post
const altaClientes = (req, res) => {
  res.status(501).send("POST clientes no implementado");
};

export { obtenerClientes, altaClientes };
