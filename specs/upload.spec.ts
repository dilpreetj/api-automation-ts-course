import controller from '../controller/upload.controller';

describe('Upload File', () => {
  it('POST /upload/single', async () => {
    const res = await controller.postUploadSingle('data/luffy.jpeg');
    expect(res.body.filename).toEqual('luffy.jpeg');
  });

  it('POST /upload/multiple', async () => {
    const files = [
      'data/luffy.jpeg',
      'data/zoro.jpg'
    ]
    const res = await controller.postUploadMultiple(files);
    expect(res.body.length).toBe(2);
    expect(res.body[0].filename).toEqual('luffy.jpeg');
    expect(res.body[1].filename).toEqual('zoro.jpg');
  });
});