const fs = require('fs');
const yaml = require('yaml');

// Leer el archivo YAML como texto
const archivo = fs.readFileSync('./datos.yml', 'utf8');

// Convertir a objeto JS
const datos = yaml.parse(archivo);

// Mostrar el contenido completo
console.log('Contenido YAML convertido a objeto JS:');
console.log(datos);

