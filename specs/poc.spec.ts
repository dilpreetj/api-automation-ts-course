import * as supertest from 'supertest';
const request = supertest('https://jsonplaceholder.typicode.com');

describe('POC Tests', () => {

  describe('GET requests', () => {
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
  });

  describe('POST request', () => {
    it('POST /posts', async () => {
      const data = {
        title: 'My favorite animes',
        body: 'Naruto, One Piece, Death Note, Hunter X Hunter',
        userId: 1,
      }

      const res = await request
        .post('/posts')
        .send(data)

      expect(res.body.title).toBe(data.title);
    })
  });

})
