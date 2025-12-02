const apicache = require('apicache');
const express = require('express');

const app = express();
const cache = apicache.middleware;

// Ruta con caché de 10 segundos
app.get('/api', cache('10 seconds'), (req, res) => {
    const numero = Math.random();
    console.log('Generando número (apicache):', numero);

    res.json({ num: numero });
});

app.listen(3000, () => {
    console.log('Servidor con apicache escuchando en puerto 3000');
});
