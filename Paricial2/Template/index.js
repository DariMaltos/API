const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Configurar Pug
app.set('view engine', 'pug');                    // motor de plantillas
app.set('views', path.join(__dirname, 'views'));  // carpeta de plantillas

// Ruta
app.get('/', (req, res) => {
  res.render('holamundo'); // renderiza la plantilla
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
