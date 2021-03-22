import request from 'supertest';
import App from './../app.js';
import Users from './../model/user.model.js';

describe('/api/v1/users', () => {
  let server;
  const baseUrl = '/api/v1/users';

  beforeEach(() => {
    server = App;
  });
  afterAll(async () => {
    server.close();
    await Users.deleteMany();
  });

  async function login() {
    const user = {
      field: 'erfan',
      password: '2020100Me',
    };
    const res = await request(server).post(`${baseUrl}/login`).send(user);
    return res.body.data.token;
  }
  describe('/profile', () => {
    it('get user profile', async () => {
      const token = await login();
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
    it('update user profile', async () => {
      const token = await login();
      const update = { username: 'john' };
      const res = await request(server)
        .patch(`${baseUrl}/profile/update`)
        .send(update)
        .set('authorization', `Bearer ${token}`);
      //   console.log(res.body);
      expect(res.body.data.username).toBe('john');
    });
  });
});
