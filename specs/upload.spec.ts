import controller from '../controller/upload.controller';

describe('Upload File', () => {
  it('POST /upload/single', async () => {
    const res = await controller.postUploadSingle('data/luffy.jpeg');
    expect(res.body.filename).toEqual('luffy.jpeg');
  });
});