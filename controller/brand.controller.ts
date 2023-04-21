import * as supertest from 'supertest';
import config from '../config/base.config';
const request = supertest(config.baseUrl);

class BrandController {
  getBrands() {
    return request.get('/brands');
  }

  getBrandById(id: string) {
    return request.get('/brands/' + id)
  }

  postBrands(data: { [key: string]: string | number }) {
    return request
      .post('/brands')
      .send(data)
  }

  putBrands(id: string, data: { [key: string]: string }) {
    return request
      .put('/brands/' + id)
      .send(data)
  }

  deleteBrand(id: string) {
    return request
      .delete('/brands/' + id)
  }
}

export default new BrandController();