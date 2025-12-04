API de Joyería

Autora: Dariana Gishel Maltos González — 21100239
Materia: API REST
Tecnologías: Node.js · Express · MySQL · Swagger · Redoc

Descripción general

La API de Joyería es un sistema backend diseñado para gestionar:

👥 Clientes

💍 Joyas

🧾 Ventas

La API sigue arquitectura MVC, utiliza MySQL como base de datos, está documentada con OpenAPI 3.0, expuesta mediante Swagger UI y Redoc, e incluye pruebas automatizadas con Jest + Supertest.

El proyecto está desplegado en Railway y cuenta con endpoints completamente funcionales (GET, POST, PUT, DELETE y PATCH).

Objetivos del proyecto

Implementar un servidor REST con Node.js y Express.

Conectar y manipular datos en MySQL.

Construir controladores y rutas siguiendo arquitectura MVC.

Documentar con Swagger UI, Redoc y OpenAPI 3.0.

Crear pruebas automatizadas con Jest + Supertest.

Desplegar la API en Railway.

Implementar actualizaciones parciales (PATCH).

Tecnologías y librerías utilizadas
Tecnología	Uso
Node.js	Entorno de ejecución
Express	Servidor web y rutas
MySQL + mysql2/promise	Base de datos
Swagger UI	Documentación interactiva
Redoc	Documentación técnica
OpenAPI 3.0	Especificación de endpoints
Jest	Testing
Supertest	Pruebas HTTP
Railway	Producción
Estructura del proyecto
joyeria-api/
├── server.js                 # Arranque del servidor
├── app.js                    # Configuración de Express
├── swagger.js                # Configura Swagger UI y sirve openapi.json
├── openapi.json              # Especificación OpenAPI 3.0
├── public/
│   └── redoc.html            # Página Redoc
├── src/
│   ├── db.js                 # Conexión MySQL
│   ├── controllers/
│   │   ├── clientesController.js
│   │   ├── joyasController.js
│   │   └── ventasController.js
│   └── routes/
│       ├── clientes.js
│       ├── joyas.js
│       └── ventas.js
├── test/
│   └── clientes.test.js      # Pruebas Jest + Supertest
├── package.json
└── README.md

Base de datos

La API utiliza la base joyeria_api, con tablas relacionales y llaves foráneas.

Crear base de datos
CREATE DATABASE IF NOT EXISTS joyeria_api;
USE joyeria_api;

Tabla joyas
CREATE TABLE joyas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(40) UNIQUE,
  nombre VARCHAR(120),
  tipo VARCHAR(40),
  material VARCHAR(40),
  talla VARCHAR(10),
  precio DECIMAL(10,2),
  stock INT DEFAULT 0,
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);

Tabla clientes
CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120),
  telefono VARCHAR(20),
  email VARCHAR(160) UNIQUE,
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);

Tabla ventas
CREATE TABLE ventas (
  id_venta INT AUTO_INCREMENT PRIMARY KEY,
  id_joya INT,
  id_cliente INT,
  cantidad INT,
  precio_unit DECIMAL(10,2),
  total DECIMAL(12,2),
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  nota VARCHAR(200),
  FOREIGN KEY (id_joya) REFERENCES joyas(id),
  FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);

Instalación y ejecución
Instalar dependencias
npm install

Servidor en desarrollo
npm run dev

Servidor en producción
npm start

URLs base

Local:
http://localhost:3000

Producción:
https://api-production-ba7c.up.railway.app

Documentación de la API
Swagger UI

http://localhost:3000/docs

Permite probar GET, POST, PUT, DELETE y PATCH.

Redoc

http://localhost:3000/docs/redoc

Incluye schemas, parámetros, ejemplos y estructura completa.

Endpoints principales
Clientes
Método	Ruta	Descripción
GET	/api/clientes	Lista todos los clientes
GET	/api/clientes/{id}	Cliente por ID
POST	/api/clientes	Crear cliente
PUT	/api/clientes/{id}	Actualizar cliente
PATCH	/api/clientes/{id}	Actualización parcial
DELETE	/api/clientes/{id}	Eliminar cliente
Joyas
Método	Ruta	Descripción
GET	/api/joyas	Lista todas
GET	/api/joyas/{id}	Obtener por ID
POST	/api/joyas	Crear
PUT	/api/joyas/{id}	Actualizar
PATCH	/api/joyas/{id}	Actualizar parcialmente
DELETE	/api/joyas/{id}	Eliminar
Ventas
Método	Ruta	Descripción
GET	/api/ventas	Lista todas
GET	/api/ventas/{id_venta}	Obtener venta
POST	/api/ventas	Crear
PUT	/api/ventas/{id_venta}	Actualizar
PATCH	/api/ventas/{id_venta}	Actualizar parcialmente
DELETE	/api/ventas/{id_venta}	Eliminar