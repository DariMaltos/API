import mysql from 'mysql2/promise';

// Función para obtener proveedores
const obtenerProveedores = (req, res) => {
  res.send("Hola Mundo desde GET proveedores");
};

// Función para dar de alta proveedores
const altaProveedores = (req, res) => {
  res.send("Hola Mundo desde POST proveedores");
};

export { obtenerProveedores, altaProveedores };
