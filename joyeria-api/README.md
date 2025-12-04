# API de Joyería  
**Autora:** Dariana Gishel Maltos González — *21100239*  
**Materia:** API REST  
**Tecnologías:** Node.js · Express · MySQL · Swagger · Redoc · Jest · Supertest  

---

## Descripción general

La **API de Joyería** es un sistema backend diseñado para gestionar:

- 👥 **Clientes**  
- 💍 **Joyas**  
- 🧾 **Ventas**

La API sigue arquitectura **MVC**, utiliza **MySQL** como base de datos, está documentada con **OpenAPI 3.0**, expuesta mediante **Swagger UI** y **Redoc**, e incluye pruebas automatizadas con **Jest** + **Supertest**.

El proyecto está desplegado en **Railway** y cuenta con endpoints completamente funcionales (GET, POST, PUT, DELETE y PATCH).

---

## Objetivos del proyecto

- Implementar un servidor REST con **Node.js y Express**.  
- Conectar y manipular datos en **MySQL**.  
- Construir controladores, rutas y modelos siguiendo **arquitectura MVC**.  
- Documentar profesionalmente usando **Swagger UI**, **Redoc** y el formato **OpenAPI 3.0**.  
- Desarrollar pruebas automatizadas con **Jest + Supertest**.  
- Realizar despliegue en un entorno cloud (**Railway**).  
- Implementar actualizaciones **parciales (PATCH)**.  

---

## Tecnologías y librerías utilizadas

| Tecnología | Uso |
|-----------|-----|
| **Node.js** | Entorno de ejecución |
| **Express** | Servidor web y manejo de rutas |
| **MySQL + mysql2/promise** | Base de datos |
| **Swagger UI** | Documentación interactiva |
| **Redoc** | Documentación tipo manual técnico |
| **OpenAPI 3.0** | Definición formal de endpoints |
| **Jest** | Testing |
| **Supertest** | Pruebas de endpoints HTTP |
| **Railway** | Despliegue en producción |

---

## Estructura del proyecto

```txt
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

## Base de datos
La API utiliza la base de datos joyeria_api con tablas relacionales y llaves foráneas:
CREATE DATABASE IF NOT EXISTS joyeria_api;
USE joyeria_api;

**Tabla joyas:**
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

**Tabla clientes:**
CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120),
  telefono VARCHAR(20),
  email VARCHAR(160) UNIQUE,
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);

**Tabla ventas:**
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


## Instalación y ejecución

**Instalar dependencias:**
--npm install

**Iniciar servidor en desarrollo:**
--npm run dev

**Servidor en modo producción:**
--npm start

**URLS base:**
--Local: http://localhost:3000
--Producción (Railway): https://api-production-ba7c.up.railway.app

## Documentación de la API
**Swagger UI**
--http://localhost:3000/docs
Permite ejecutar GET, POST, PUT, DELETE y PATCH.

**Redoc**
--http://localhost:3000/docs/redoc
Incluye:
Schemas
Parámetros
Ejemplos (x-codeSamples)
Códigos de respuesta

## Endpoints principales
A continuación, se muestran los endpoints organizados por recurso (Clientes, Joyas y Ventas) con sus métodos HTTP y rutas correspondientes:
**Clientes**

--GET — /api/clientes
Lista todos los clientes.

--GET — /api/clientes/{id}
Obtiene un cliente por ID.

--POST — /api/clientes
Crea un nuevo cliente.

--PUT — /api/clientes/{id}
Actualiza un cliente completamente.

--PATCH — /api/clientes/{id}
Actualiza parcialmente un cliente.

--DELETE — /api/clientes/{id}
Elimina un cliente por ID.

**Joyas**
--GET — /api/joyas
Lista todas las joyas.

--GET — /api/joyas/{id}
Obtiene una joya por ID.

--POST — /api/joyas
Crea una nueva joya.

--PUT — /api/joyas/{id}
Actualiza una joya completamente.

--PATCH — /api/joyas/{id}
Actualiza parcialmente una joya.

--DELETE — /api/joyas/{id}
Elimina una joya por ID.


**Ventas**
--GET — /api/ventas
Lista todas las ventas.

--GET — /api/ventas/{id_venta}
Obtiene una venta por ID.

--POST — /api/ventas
Crea una nueva venta.

--PUT — /api/ventas/{id_venta}
Actualiza completamente una venta.

--PATCH — /api/ventas/{id_venta}
Actualiza parcialmente una venta.

--DELETE — /api/ventas/{id_venta}
Elimina una venta por ID.