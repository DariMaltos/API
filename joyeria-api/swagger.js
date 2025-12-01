const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

function setupSwagger(app) {
  const openapiPath = path.join(__dirname, 'openapi.json');
  const openapiDocument = JSON.parse(fs.readFileSync(openapiPath, 'utf8'));

  // Sirve el JSON de OpenAPI
  app.get('/openapi.json', (req, res) => {
    res.json(openapiDocument);
  });

  // Swagger UI SOLO en /docs
  app.use('/docs', swaggerUi.serve);
  app.get('/docs', swaggerUi.setup(openapiDocument));
}

module.exports = setupSwagger;
