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

// Redoc HTML
app.use('/docs/redoc', express.static(path.join(__dirname, 'public', 'redoc.html')));

// Endpoint de prueba
app.get('/', (req, res) => {
  res.send('API de Joyería funcionando');
});

// Rutas API
app.use('/api/clientes', clientesRouter);
app.use('/api/joyas', joyasRouter);
app.use('/api/ventas', ventasRouter);


module.exports = app;
