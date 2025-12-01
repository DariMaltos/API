const request = require('supertest');
const app = require('../app');
const pool = require('../src/db'); // para cerrar conexión al final

describe('GET /api/clientes', () => {
  it('debe regresar 200 y un arreglo de clientes', async () => {
    const res = await request(app).get('/api/clientes');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const cliente = res.body[0];
      expect(cliente).toHaveProperty('id');
      expect(cliente).toHaveProperty('nombre');
      expect(cliente).toHaveProperty('telefono'); // <-- aquí estaba el error
      expect(cliente).toHaveProperty('email');
    }
  });
});

afterAll(async () => {
  // Cerramos el pool de MySQL para que Jest termine sin colgarse
  await pool.end();
});
