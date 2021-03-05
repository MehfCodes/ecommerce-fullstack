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
  it('signup', async () => {
    // console.log(process.env.NODE_ENV, process.env.PORT, process.env.PORT_TEST);
    let newUser = {
      username: 'erfan',
      phoneNumber: '09122240245',
      password: '2020100Me',
      confirmPassword: '2020100Me',
    };
    const res = await request(server).post(`${baseUrl}/signup`).send(newUser);
    expect(res.body.data.username).toBe('erfan');
  });

  it('validation error during signup', async () => {
    let newUser = {
      username: 'ali',
      phoneNumber: '09122240245',
      password: '2020100Me1',
      confirmPassword: '2020100Me',
    };
    const res = await request(server).post(`${baseUrl}/signup`).send(newUser);
    expect(res.body.statusCode).toBe(400);
  });
  it('dublicated field error during signup', async () => {
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
