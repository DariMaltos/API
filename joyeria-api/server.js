// server.js
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API de joyería escuchando en el puerto ${PORT}`);
  console.log(`Swagger UI listo en /docs`);
  console.log(`Redoc listo en /docs/redoc`);
});
