import mongoose from 'mongoose';
import userController from './user.controller';
import mockResponse from '../utils/mockResponse';

const testData = { username: 'matteo', password: 'my-password' };

describe('Users test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  });

  test('Create a user', async () => {
    const res = mockResponse();
    await userController.create({ body: testData }, res);
    expect(res.json).toBeCalledTimes(1);
    const user = res.json.mock.calls[0][0];
    expect(user.username).toEqual('matteo');
    expect(user.password).toEqual('my-password');
  });

  test('Creation error', async () => {
    const res = mockResponse();
    await userController.create(undefined, res);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledTimes(1);
  });

  test('Authenticate', async () => {
    const res = mockResponse();
    await userController.authenticate({ body: testData }, res);
    expect(res.json).toBeCalledTimes(1);
    const response = res.json.mock.calls[0][0];
    expect(response.token).toBeDefined();
  });

  test('Get user without username should return status 400', async () => {
    const res = mockResponse();
    await userController.authenticate({ body: { password: 'foo' } }, res);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledTimes(1);
  });

  test('Get user without password should return status 400', async () => {
    const res = mockResponse();
    await userController.authenticate({ body: { username: 'foo' } }, res);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledTimes(1);
  });

  test('User not found', async () => {
    const res = mockResponse();
    await userController.authenticate({ body: { username: 'foo', password: 'bar' } }, res);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledTimes(1);
  });

  test('Find user error', async () => {
    const res = mockResponse();
    await userController.authenticate(undefined, res);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledTimes(1);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
