CCREATE DATABASE IF NOT EXISTS joyeria_api;
USE joyeria_api;

CREATE TABLE joyas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sku VARCHAR(40) NOT NULL UNIQUE,
  nombre VARCHAR(120) NOT NULL,
  tipo ENUM('anillo','cadena','aretes','pulsera','dije','reloj') NOT NULL,
  material ENUM('plata_925','acero_inoxidable','chapa_oro','fantasia') NOT NULL,
  talla VARCHAR(10),
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clientes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(120) NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(160) UNIQUE,
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ventas (
  id_venta INT PRIMARY KEY AUTO_INCREMENT,
  id_joya INT NOT NULL,
  id_cliente INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unit DECIMAL(10,2) NOT NULL,
  total DECIMAL(12,2) NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  nota VARCHAR(200),
  FOREIGN KEY (id_joya) REFERENCES joyas(id),
  FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);

INSERT INTO joyas (sku, nombre, tipo, material, talla, precio, stock) VALUES
('00001','gota dorada','aretes','acero_inoxidable',NULL,150.00,15),
('00002','anillo sol y luna','anillo','chapa_oro',NULL,220.00,40),
('00003','Cadena Dije Estrella','cadena','acero_inoxidable',NULL,120.00,25);

INSERT INTO clientes (nombre, telefono, email) VALUES
('Ana Pérez','867-111-2233','ana@example.com'),
('Luis Gómez','867-222-3344','luis@example.com');

-- ejemplo de venta: Ana compra 2 aretes "gota dorada" (sku 00001)
INSERT INTO ventas (id_joya, id_cliente, cantidad, precio_unit, total, nota)
SELECT j.id, c.id, 2, j.precio, j.precio*2, 'Venta mostrador'
FROM joyas j
JOIN clientes c ON c.email='ana@example.com'
WHERE j.sku='00001';
