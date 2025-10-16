// index.js
const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Leer llaves
const privateKey = fs.readFileSync('./keys/private.pem', 'utf8');
const publicKey = fs.readFileSync('./keys/public.pem', 'utf8');

//para probar funcionamiento
app.get('/', (req, res) => {
  res.json({ ok: true, msg: 'Servidor Express con JWT RS256 activo' });
});

// Ruta pública: genera token
app.post('/login', (req, res) => {
  const payload = {
    usuario: req.body.usuario || 'anonimo',
    rol: req.body.rol || 'invitado'
  };

  // Firmar JWT con la llave privada y RS256
  const token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '15m',
    issuer: 'miServidorExpress'
  });

  res.json({ token });
});

// Middleware para verificar token
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no enviado o mal formado' });
  }

  const token = authHeader.substring(7);
  jwt.verify(token, publicKey, { algorithms: ['RS256'], issuer: 'miServidorExpress' }, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Acceso no concedido: token inválido o expirado' });
    }
    req.user = decoded;
    next();
  });
}

// Ruta protegida
app.get('/sistema', verificarToken, (req, res) => {
  res.json({
    mensaje: 'Acceso concedido al sistema',
    usuario: req.user
  });
});

// Iniciar servidor
app.listen(8081, () => {
  console.log('Servidor Express escuchando en puerto 8081');
});
