const request = require('supertest');
const app = require('../server');

describe('Server API', () => {
  it('GET / returnerar "Connecting People API is running"', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Connecting People API is running');
  });
});
