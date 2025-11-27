import path from "path";
import { fileURLToPath } from "url";
import swaggerJSDoc from "swagger-jsdoc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Joyería",
    version: "1.0.0",
    description: "Documentación de la API de joyería (clientes, joyas, ventas)",
  },
  servers: [{ url: "http://localhost:3000", description: "Servidor local" }],
};

//GLOB compatible con Windows
const routesGlob = path.join(__dirname, "rutas/*.js").replace(/\\/g, "/");

export const swaggerSpec = swaggerJSDoc({
  definition: swaggerDefinition,
  apis: [routesGlob],
});
