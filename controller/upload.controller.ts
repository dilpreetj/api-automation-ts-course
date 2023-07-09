import * as supertest from 'supertest';
import config from '../config/base.config';
const request = supertest(config.baseUrl);

class UploadController {
  postUploadSingle(filepath: string) {
    return request
      .post('/upload/single')
      .attach('single', filepath)
  }
}

export default new UploadController();