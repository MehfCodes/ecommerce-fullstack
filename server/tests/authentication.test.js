import request from 'supertest';
import App from '../app';
import Users from './../model/user.model';
describe('/api/v1/users', () => {
  let server;
  const baseUrl = '/api/v1/users';
  beforeAll(() => {
    server = App;
  });
  afterAll(async () => {
    server.close();
    await Users.deleteMany();
  });

  describe('/signup', () => {
    it('signup user', async () => {
      // console.log(process.env.NODE_ENV, process.env.PORT, process.env.PORT_TEST);
      let newUser = {
        username: 'erfan',
        phoneNumber: '09122240245',
        password: '2020100Me',
        confirmPassword: '2020100Me',
      };
      const res = await request(server).post(`${baseUrl}/signup`).send(newUser);
      expect(res.body.data.user.username).toBe('erfan');
    });

    it('ERROR: validation error during signup', async () => {
      let newUser = {
        username: 'ali',
        phoneNumber: '09122240245',
        password: '2020100Me1',
        confirmPassword: '2020100Me',
      };
      const res = await request(server).post(`${baseUrl}/signup`).send(newUser);
      expect(res.body.statusCode).toBe(400);
    });
    it('ERROR: dublicated field error during signup', async () => {
      let newUser = {
        username: 'erfan',
        phoneNumber: '09122240245',
        password: '2020100Me',
        confirmPassword: '2020100Me',
      };
      const res = await request(server).post(`${baseUrl}/signup`).send(newUser);
      expect(res.body.statusCode).toBe(406);
    });
  });

  describe('/login', () => {
    it('login user', async () => {
      const user = {
        field: 'erfan',
        password: '2020100Me',
      };
      const res = await request(server).post(`${baseUrl}/login`).send(user);
      expect(res.body.data.user.username).toBe('erfan');
    });

    it('ERROR: user not found during login', async () => {
      const user = {
        field: 'john',
        password: '2020100Me',
      };
      const res = await request(server).post(`${baseUrl}/login`).send(user);
      expect(res.body.statusCode).toBe(404);
    });

    it('ERROR: incurrect password during login', async () => {
      const user = {
        field: 'erfan',
        password: '2020100Me1',
      };
      const res = await request(server).post(`${baseUrl}/login`).send(user);
      expect(res.body.statusCode).toBe(401);
    });
  });
  describe('/logout', () => {
    it('logout user', async () => {
      const res = await request(server).delete(`${baseUrl}/logout`);
      expect(res.body.data).toBe('logout successful');
    });
  });
});
