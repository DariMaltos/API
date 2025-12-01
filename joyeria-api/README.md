# 💎 API de Joyería  
**Autora: Dariana Gishel Maltos González — 21100239**

API REST para gestionar **clientes, joyas y ventas** de una joyería.  
Desarrollada con **Node.js + Express + MySQL**, documentada mediante **OpenAPI 3.0**, **Swagger UI** y **Redoc**, e incluye pruebas automatizadas con **Jest + Supertest**.

---

## 🎯 Objetivo del proyecto

Desarrollar una API funcional y documentada que permita:

- Consultar información de clientes, joyas y ventas.
- Implementar arquitectura **MVC** (Model – View – Controller).
- Usar una base de datos **MySQL** con WAMP.
- Documentar la API con **OpenAPI 3.0**.
- Mostrar documentación en **Swagger UI** y **Redoc**.
- Usar ejemplos de consumo en Python y JavaScript via **x-codeSamples**.
- Generar un **SDK en JavaScript** desde `openapi.json`.
- Ejecutar pruebas unitarias con **Jest** y **Supertest**.

---

## 🧱 Tecnologías utilizadas

- Node.js
- Express
- MySQL (WAMP)
- mysql2/promise
- Swagger UI (swagger-ui-express)
- Redoc
- Jest
- Supertest
- OpenAPI Generator CLI

---

## 📁 Estructura del proyecto

```txt
joyeria-api/
├── server.js                 # Arranque del servidor
├── app.js                    # Configuración de Express
├── swagger.js                # Swagger UI y /openapi.json
├── openapi.json              # Definición OpenAPI 3.0
├── public/
│   └── redoc.html            # Página con Redoc
├── src/
│   ├── db.js                 # Conexión a MySQL
│   ├── controllers/
│   │   ├── clientesController.js
│   │   ├── joyasController.js
│   │   └── ventasController.js
│   └── routes/
│       ├── clientes.js
│       ├── joyas.js
│       └── ventas.js
├── test/
│   └── clientes.test.js      # Pruebas Jest/Supertest
├── sdk/                      # SDK generado automáticamente
├── package.json
└── README.md

-- ===============================
--  BASE DE DATOS joyeria_api
-- ===============================

CREATE DATABASE IF NOT EXISTS joyeria_api;
USE joyeria_api;

-- ===============================
--  TABLA: joyas
-- ===============================

CREATE TABLE joyas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(40) UNIQUE,
  nombre VARCHAR(120),
  tipo ENUM('anillo','cadena','aretes','pulsera','dije','reloj'),
  material ENUM('plata_925','acero_inoxidable','chapa_oro','fantasia'),
  talla VARCHAR(10),
  precio DECIMAL(10,2),
  stock INT DEFAULT 0,
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
--  TABLA: clientes
-- ===============================

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120),
  telefono VARCHAR(20),
  email VARCHAR(160) UNIQUE,
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
--  TABLA: ventas
-- ===============================

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
▶️ Instalación y ejecución
1️⃣ Instalar dependencias
npm install

2️⃣ Iniciar servidor

Modo desarrollo (con nodemon):

npm run dev


Modo normal:

npm start


El servidor responde en:

http://localhost:3000/ → mensaje “API de Joyería funcionando”.

📚 Documentación generada
🟦 Swagger UI

Interfaz interactiva donde se pueden probar los endpoints:

http://localhost:3000/docs

🔵 Redoc

Documentación tipo “manual técnico” basada en OpenAPI 3.0:

http://localhost:3000/docs/redoc

🟧 OpenAPI JSON

Objeto OpenAPI utilizado tanto por Swagger como por Redoc y el generador de SDK:

http://localhost:3000/openapi.json

En Redoc se muestran también los x-codeSamples, con ejemplos de consumo de la API en JavaScript y Python.

🧵 Endpoints principales
Clientes

GET /api/clientes
Devuelve la lista completa de clientes.

GET /api/clientes?id=1
Devuelve el cliente con id = 1.

Joyas

GET /api/joyas
Devuelve la lista de joyas.

GET /api/joyas?id=1
Devuelve la joya con id = 1.

Ventas

GET /api/ventas
Devuelve todas las ventas registradas.

GET /api/ventas?id_venta=1
Devuelve la venta con id_venta = 1.

💻 Ejemplos de consumo (JavaScript y Python)

Estos ejemplos también se encuentran como x-codeSamples dentro de openapi.json y se visualizan en Redoc.

JavaScript – fetch (navegador)
// Obtener todos los clientes
fetch('http://localhost:3000/api/clientes')
  .then(res => res.json())
  .then(data => console.log('Clientes:', data))
  .catch(console.error);

// Obtener todas las joyas
fetch('http://localhost:3000/api/joyas')
  .then(res => res.json())
  .then(data => console.log('Joyas:', data))
  .catch(console.error);

Python – requests
import requests

# Obtener lista de clientes
resp = requests.get("http://localhost:3000/api/clientes")
print("Status:", resp.status_code)
print("Clientes:", resp.json())

# Obtener lista de ventas
resp = requests.get("http://localhost:3000/api/ventas")
print("Ventas:", resp.json())

🧪 Pruebas automatizadas (Jest + Supertest)

El proyecto incluye pruebas con Jest y Supertest para verificar el funcionamiento de la API.

Ejecutar todas las pruebas:

npm test


Ejemplo de prueba (test/clientes.test.js):

const request = require('supertest');
const app = require('../app');
const pool = require('../src/db');

describe('GET /api/clientes', () => {
  it('debe regresar 200 y un arreglo de clientes', async () => {
    const res = await request(app).get('/api/clientes');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

afterAll(async () => {
  await pool.end();
});

📦 SDK en JavaScript (OpenAPI Generator)

A partir del archivo openapi.json, se puede generar un SDK en JavaScript usando OpenAPI Generator CLI.

Script definido en package.json:

"generate:sdk": "openapi-generator-cli generate -i openapi.json -g javascript -o sdk"


Para generar el SDK:

npm run generate:sdk


Esto crea una carpeta sdk/ con el cliente JavaScript para consumir la API desde otras aplicaciones.

👤 Autora

Dariana Gishel Maltos González — 21100239
Proyecto académico: API REST de Joyería