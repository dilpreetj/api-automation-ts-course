import controller from '../controller/brand.controller';

describe('Brands', () => {

  describe('Fetch brands', () => {
    it('GET /brands', async () => {
      const res = await controller.getBrands();
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(1);
      expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);
    });
  });

  describe('Create brands', () => {
    let postBrand;
    const data = {
      'name': 'Test Brand ' + Math.floor(Math.random() * 100000),
      'description': 'Test Brand Description'
    }
    beforeAll(async () => {
      postBrand = await controller.postBrands(data);
    })

    afterAll(async () => {
      await controller.deleteBrand(postBrand.body._id);
    })
    it('POST /brands', async () => {
      expect(postBrand.statusCode).toEqual(200)
      expect(postBrand.body.name).toEqual(data.name)
      expect(postBrand.body).toHaveProperty('createdAt')
    });

    it('Schema Verification - Name is a mandatory field', async () => {
      const data = {
        'name': '',
        'description': 'Test Brand Description'
      }
      const res = await controller.postBrands(data);

      expect(res.statusCode).toEqual(422)
      expect(res.body.error).toEqual('Name is required');
    });

    it('Schema Verification - Min char length for name > 1', async () => {
      const data = {
        'name': 'a',
        'description': 'Test Brand Description'
      }
      const res = await controller.postBrands(data);

      expect(res.statusCode).toEqual(422)
      expect(res.body.error).toEqual('Brand name is too short');
    });

    it('Schema Verification - Max char length for name = 30', async () => {
      const data = {
        'name': 'This is a really long brand name '
      }

      const res = await controller.postBrands(data);

      expect(res.statusCode).toEqual(422)
      expect(res.body.error).toEqual('Brand name is too long');
    });

    it('Schema Verification - Description must be a string', async () => {
      const data = {
        'name': 'Sample Brand',
        'description': 123
      }

      const res = await controller.postBrands(data);

      expect(res.statusCode).toEqual(422)
      expect(res.body.error).toEqual('Brand description must be a string');
    });
    it('Business Logic - Duplicate brand entries not allowed', async () => {
      // second request
      const res2 = await controller.postBrands(data);

      expect(res2.statusCode).toEqual(422)
      expect(res2.body.error).toContain('already exists')
    });
  });

  describe('Fetch Individual Brand', () => {
    describe('GET /brand/:id', () => {
      let postBrand;
      beforeAll(async () => {
        const data = {
          'name': 'Test Brand ' + Math.floor(Math.random() * 100000),
          'description': 'Test Brand Description'
        }
        postBrand = await controller.postBrands(data);
      })
      afterAll(async () => {
        await controller.deleteBrand(postBrand.body._id);
      })

      it('Business Logic - GET /brand/invalid_id should throw 404', async () => {
        const res = await controller.getBrandById('12348f0500b2931578c0a5ac');

        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toContain('Brand not found.')
      });

      it('GET /brand/:id', async () => {
        const res = await controller.getBrandById(postBrand.body._id);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual(postBrand.body.name)
      });
    });
  })

  describe('Update brands', () => {
    let postBrand;
    const data = {
      'name': 'Test Brand ' + Math.floor(Math.random() * 100000),
      'description': 'Test Brand Description'
    }
    beforeAll(async () => {
      postBrand = await controller.postBrands(data);
    })
    afterAll(async () => {
      await controller.deleteBrand(postBrand.body._id)
    })
    it('PUT /brands', async () => {
      const data = {
        'name': postBrand.body.name + ' updated'
      }
      const res = await controller.putBrands(postBrand.body._id, data);

      expect(res.statusCode).toEqual(200)
      expect(res.body.name).toEqual(data.name)
    });
    it('PUT /brands/invalid_id', async () => {
      const data = {
        'name': ' updated'
      }
      const res = await controller.putBrands('123', data);

      expect(res.statusCode).toEqual(422)
      expect(res.body.error).toContain('Unable to update brands')
    });
  });

  describe('Delete Brands', () => {
    let postBrand;
    const data = {
      'name': 'Test Brand ' + Math.floor(Math.random() * 100000),
      'description': 'Test Brand Description'
    }
    beforeAll(async () => {
      postBrand = await controller.postBrands(data)
    })
    it('DELETE /brands', async () => {
      const res = await controller.deleteBrand(postBrand.body._id)
      expect(res.statusCode).toEqual(200)
    });
    it('DELETE /brands/invalid_id', async () => {
      const res = await controller.deleteBrand('123')
      expect(res.statusCode).toEqual(422)
      expect(res.body.error).toContain('Unable to delete brand')
    });
  });
});
