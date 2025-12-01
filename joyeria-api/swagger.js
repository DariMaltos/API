// swagger.js
const swaggerUi = require('swagger-ui-express');
const openapiDocument = require('./openapi.json');

function setupSwagger(app) {
  // Swagger UI en /docs
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

  // OpenAPI JSON en /openapi.json (para Redoc y SDK)
  app.get('/openapi.json', (req, res) => {
    res.json(openapiDocument);
  });
}

module.exports = setupSwagger;
