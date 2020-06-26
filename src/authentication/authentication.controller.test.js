import constants from '../utils/constants';
import jwt from 'jsonwebtoken';
import mockResponse from '../utils/mockResponse';
import authenticationController from './authentication.controller';

describe('Authentication controller', () => {
  let mockRequest;

  beforeAll(() => {
    mockRequest = { headers: {} };
  });

  test('Verify token', async () => {
    const res = mockResponse();
    mockRequest.headers['access-token'] = jwt.sign({ username: 'matteo' }, constants.jwt_key, { expiresIn: 1440 });
    const cb = jest.fn();
    await authenticationController.verifyToken(mockRequest, res, cb);
    expect(cb).toBeCalledTimes(1);
    expect(mockRequest.decoded.username).toEqual('matteo');
  });

  test('Invalid token', async () => {
    const res = mockResponse();
    mockRequest.headers['access-token'] = jwt.sign({ username: 'matteo' }, 'invalid_key', { expiresIn: 1440 });
    const cb = jest.fn();
    await authenticationController.verifyToken(mockRequest, res, cb);
    expect(cb).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.send).toBeCalledTimes(1);
    const status = res.status.mock.calls[0][0];
    expect(status).toBe(500);
  });

  test('Pass blank token should return status 401', async () => {
    const res = mockResponse();
    mockRequest.headers['access-token'] = undefined;
    const cb = jest.fn();
    await authenticationController.verifyToken(mockRequest, res, cb);
    expect(cb).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.send).toBeCalledTimes(1);
    const status = res.status.mock.calls[0][0];
    expect(status).toBe(401);
  });
});
