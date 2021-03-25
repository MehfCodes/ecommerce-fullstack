import request from 'supertest';
import App from './../app.js';
import Products from './../model/product.model.js';

describe('/api/v1/products', () => {
  let server;
  const baseUrl = '/api/v1/products';
  beforeEach(() => {
    server = App;
  });
  afterAll(async () => {
    await Products.deleteMany({});
  });

  describe('/create', () => {
    it('create a product', async () => {
      const newProduct = {
        name: 'Brown Brim',
        imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
        price: 25,
        quantity: 10,
        description: 'it good hat',
        category: 'hat',
      };
      const res = await request(server)
        .post(`${baseUrl}/create`)
        .send(newProduct);
      expect(res.body.data.name).toBe('Brown Brim');
    });

    it('ERROR : validation error during create a product', async () => {
      const newProduct = {
        imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
        price: 25,
        quantity: 10,
        description: 'it good hat',
        category: 'hat',
      };
      const res = await request(server)
        .post(`${baseUrl}/create`)
        .send(newProduct);
      expect(res.body.statusCode).toBe(400);
    });
  });
  describe('/getAll', () => {
    it('get all products existed in DataBase', async () => {
      const res = await request(server).get(`${baseUrl}/getAll`);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });
});
