require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const setupSwagger = require('./swagger');
const clientesRouter = require('./src/routes/clientes');
const joyasRouter = require('./src/routes/joyas');
const ventasRouter = require('./src/routes/ventas');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger UI + /openapi.json
setupSwagger(app);

// Redoc leyendo el mismo openapi.json
app.get('/docs/redoc', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'redoc.html'));
});

// (Opcional) que también funcione en /redoc
app.get('/redoc', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'redoc.html'));
});

// Endpoint de prueba
app.get('/', (req, res) => {
  res.send('API de Joyería funcionando');
});

// Rutas de la API
app.use('/api/clientes', clientesRouter);
app.use('/api/joyas', joyasRouter);
app.use('/api/ventas', ventasRouter);

module.exports = app;
