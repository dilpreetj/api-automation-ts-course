import controller from '../controller/categories.controller';

describe('Categories', () => {
  it('GET /categories', async () => {
    const res = await controller.getCategories();
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(1);
    expect(Object.keys(res.body[0])).toEqual(['_id', 'name'])
  });

  describe('Create Categories', () => {
    it('POST /categories', async () => {
      const body = { "name": "Test Category " + Math.floor(Math.random() * 10000) }
      const res = await controller
        .postCategories(body)

      expect(res.statusCode).toEqual(200);
    });
  });
});