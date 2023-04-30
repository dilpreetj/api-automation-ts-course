import config from '../config/base.config';
import adminController from '../controller/admin.controller';
import controller from '../controller/categories.controller';

describe('Categories', () => {
  it('GET /categories', async () => {
    const res = await controller.getCategories();
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(1);
    expect(Object.keys(res.body[0])).toEqual(['_id', 'name'])
  });

  describe('Create Categories', () => {
    let token;

    beforeAll(async () => {
      const data = {"email": config.email, "password": config.password}
      const res = await adminController.postAdminLogin(data);
      token = res.body.token;
    })

    it('POST /categories', async () => {
      const body = { "name": "Test Category " + Math.floor(Math.random() * 10000) }
      const res = await controller
        .postCategories(body)
        .set("Authorization", "Bearer " + token)
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual(body.name);
    });
  });
});