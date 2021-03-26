import request from 'supertest';
import App from './../app.js';
import Users from './../model/user.model.js';

describe('/api/v1/users', () => {
  let server;
  let token;
  const baseUrl = '/api/v1/users';

  beforeEach(() => {
    server = App;
  });
  beforeAll(async () => {
    const user = {
      field: 'erfan',
      password: '2020100Me',
    };
    const res = await request(App).post('/api/v1/users/login').send(user);
    token = res.body.data.token;
  });
  afterAll(async () => {
    server.close();
    await Users.deleteMany({});
  });

  async function login() {
    const user = {
      field: 'erfan',
      password: '2020100Me',
    };
    const res = await request(server).post(`${baseUrl}/login`).send(user);
    // console.log(res.body);
    return res.body.data.token;
  }

  describe('/', () => {
    it('get All Users', async () => {
      // const token = await login();
      const res = await request(server)
        .get(`${baseUrl}`)
        .set('authorization', `Bearer ${token}`);
      expect(res.body.data.length).not.toBe(0);
    });
  });

  describe('/profile', () => {
    it('get user profile', async () => {
      // const token = await login();
      const res = await request(server)
        .get(`${baseUrl}/profile`)
        .set('authorization', `Bearer ${token}`);
      expect(res.body.data.username).toBe('erfan');
    });
    it('ERROR : user not found during get it', async () => {
      const user = {
        field: 'erfani',
        password: '2020100Me',
      };
      const res = await request(server).post(`${baseUrl}/login`).send(user);
      expect(res.body.statusCode).toBe(404);
    });
    it('ERROR : user is not loged in', async () => {
      const res = await request(server).get(`${baseUrl}/profile`);
      expect(res.body.statusCode).toBe(401);
    });
  });

  describe('/profile/update', () => {
    it('ERROR : user wants to change password', async () => {
      // const token = await login();
      const update = { password: '123456789' };
      const res = await request(server)
        .patch(`${baseUrl}/profile/update`)
        .send(update)
        .set('authorization', `Bearer ${token}`);
      // console.log(res.body);
      expect(res.body.statusCode).toBe(400);
    });

    it('update user profile', async () => {
      // const token = await login();
      const update = { phoneNumber: '09122240246' };
      const res = await request(server)
        .patch(`${baseUrl}/profile/update`)
        .send(update)
        .set('authorization', `Bearer ${token}`);
      // console.log(res.body);
      expect(res.body.data.phoneNumber).toBe('09122240246');
    });
  });
});
