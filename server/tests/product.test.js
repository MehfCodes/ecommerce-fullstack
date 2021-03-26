import request from 'supertest';
import App from './../app.js';
import Products from './../model/product.model.js';
import Users from './../model/product.model.js';
describe('/api/v1/products', () => {
  let server;
  let token;
  const baseUrl = '/api/v1/products';
  let productId;
  beforeEach(() => {
    server = App;
  });
  beforeAll(async () => {
    let newUser = {
      username: 'erfano',
      phoneNumber: '09122240241',
      password: '2020100Me',
      confirmPassword: '2020100Me',
    };
    const res = await request(App).post(`/api/v1/users/signup`).send(newUser);
    token = res.body.data.token;
  });
  afterAll(async () => {
    server.close();
    await Products.deleteMany();
    await Users.deleteMany();
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
        .send(newProduct)
        .set('authorization', `Bearer ${token}`);
      productId = res.body.data._id;
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
        .send(newProduct)
        .set('authorization', `Bearer ${token}`);
      expect(res.body.statusCode).toBe(400);
    });
  });
  describe('/getAll', () => {
    it('get all products existed in DataBase', async () => {
      const res = await request(server).get(`${baseUrl}/getAll`);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
    // it('ERROR : there is no products', async () => {
    //   await Products.deleteMany({});
    //   const res = await request(App).get(`${baseUrl}/getAll`);
    //   expect(res.body.data.length).toBe(0);
    // });
  });
  describe('/getProductById/:id', () => {
    it('get product by id ', async () => {
      const res = await request(server).get(
        `${baseUrl}/getProductById/${productId}`
      );
      expect(res.body.data.name).toBe('Brown Brim');
    });
    it('ERROR : invalid ObjectId ', async () => {
      const res = await request(server).get(
        `${baseUrl}/getProductById/${1256}`
      );
      expect(res.body.statusCode).toBe(400);
    });
    it('ERROR : product not found ', async () => {
      let id = productId.substr(0, productId.length - 1) + '5';
      const res = await request(server).get(`${baseUrl}/getProductById/${id}`);
      expect(res.body.statusCode).toBe(404);
    });
  });

  describe('/update/:id', () => {
    it('update a product', async () => {
      const res = await request(server)
        .patch(`${baseUrl}/update/${productId}`)
        .send({ price: 100 })
        .set('authorization', `Bearer ${token}`);
      expect(res.body.data.price).toBe(100);
    });
    it('ERROR : update the product failed', async () => {
      const res = await request(server)
        .patch(`${baseUrl}/update/${productId.substr(1) + '5'}`)
        .send({ price: 100 })
        .set('authorization', `Bearer ${token}`);
      expect(res.body.statusCode).toBe(406);
    });
  });
  describe('/delete/:id', () => {
    it('delete a product', async () => {
      const res = await request(server)
        .delete(`${baseUrl}/delete/${productId}`)
        .set('authorization', `Bearer ${token}`);
      expect(res.body.data).toContain('deleted');
    });
    it('ERROR : delete the product failed', async () => {
      const res = await request(server)
        .delete(`${baseUrl}/delete/${productId.substr(1) + '5'}`)
        .set('authorization', `Bearer ${token}`);
      expect(res.body.statusCode).toBe(406);
    });
  });
});
