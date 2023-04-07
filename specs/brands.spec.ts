import * as supertest from 'supertest';
const request = supertest('https://sdetunicorns.com/api/test')

describe('Brands', () => {
  it('GET /brands', async () => {
    const res = await request.get('/brands');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(1);
    expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);
  });

  it('GET /brand/:id', async () => {
    const res = await request.get('/brands/63448f0500b2931578c0a5b1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Apple')
  });
});
