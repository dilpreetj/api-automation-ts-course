import * as supertest from 'supertest';
const request = supertest('https://jsonplaceholder.typicode.com');

describe('POC Tests', () => {
  it('GET /posts', async () => {
    const res = await request.get('/posts');
    expect(res.statusCode).toBe(200)
    expect(res.body[0].id).toBe(1);
  })

  it('GET /comments with query params', async () => {
    // const res = await request.get('/comments?postId=1')
    const res = await request
      .get('/comments')
      .query({ postId: 1, limit: 10 })
    expect(res.body[0].postId).toBe(1)
  });
})
