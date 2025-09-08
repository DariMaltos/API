import express from "express";
import cors from "cors";

const app = express();
const port = 3000;


app.use(express.json());

// Ruta simple
app.use("/clientes" ,clientesRouter)
app.use("/proveedores" ,proveedoresRouter)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
