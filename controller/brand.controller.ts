import * as supertest from 'supertest';
const request = supertest('https://sdetunicorns.com/api/test')

class BrandController {
  getBrands() {
    return request.get('/brands');
  }

  getBrandById(id: string) {
    return request.get('/brands/' + id)
  }

  postBrands(data: { [key: string]: string }) {
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