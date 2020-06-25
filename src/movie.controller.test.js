import mongoose from 'mongoose';
import movieController from './movie.controller';

const testData = { title: 'Back to the future', year: 1985, director: 'Robert Zemeckis' };

const mockResponse = () => {
  const res = {}
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res
};

describe('Movies Test', () => {
  let createdMovieId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  });

  test('Create a movie', async () => {
    const res = mockResponse();
    await movieController.create({ body: testData }, res);
    expect(res.json).toBeCalledTimes(1);
    const movie = res.json.mock.calls[0][0];
    expect(movie.title).toBe('Back to the future');
    createdMovieId = movie._id;
  });

  test('Creation error', async () => {
    const res = mockResponse();
    await movieController.create(undefined, res);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledTimes(1);
  });

  test('Find a movie', async () => {
    const res = mockResponse();
    await movieController.find({ body: { title: 'Back to the future' } }, res);
    expect(res.json).toBeCalledTimes(1);
    const movies = res.json.mock.calls[0][0];
    expect(movies[0]._id).toEqual(createdMovieId);
  });

  test('Find error', async () => {
    const res = mockResponse();
    await movieController.find(undefined, res);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledTimes(1);
  });

  test('Get a movie by id', async () => {
    const res = mockResponse();
    await movieController.getById({ params: { id: createdMovieId } }, res);
    expect(res.json).toBeCalledTimes(1);
    const movie = res.json.mock.calls[0][0];
    expect(movie._id).toEqual(createdMovieId);
  });

  test('Movie id not found', async () => {
    const res = mockResponse();
    await movieController.getById({ params: { id: '123412341234123412341234' } }, res);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledTimes(1);
    expect(res.send).toBeCalledWith('Movie not found');
  });

  test('Get by id error', async () => {
    const res = mockResponse();
    await movieController.getById({ params: { id: 1234 } }, res);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledTimes(1);
  });

  test('Update a movie', async () => {
    const res = mockResponse();
    await movieController.update({ params: { id: createdMovieId }, body: { ...testData, year: 1986 } }, res);
    expect(res.json).toBeCalledTimes(1);
    const movie = res.json.mock.calls[0][0];
    expect(movie._id).toEqual(createdMovieId);
    expect(movie.year).toBe(1986);
  });

  test('Update error', async () => {
    const res = mockResponse();
    await movieController.update({ params: { id: 1234 } }, res);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledTimes(1);
  });

  test('Delete a movie', async () => {
    const res = mockResponse();
    await movieController.delete({ params: { id: createdMovieId } }, res);
    expect(res.send).toBeCalledTimes(1);
    expect(res.send).toBeCalledWith();
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(204);
  });

  test('Delete error', async () => {
    const res = mockResponse();
    await movieController.delete({ params: { id: 1234 } }, res);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledTimes(1);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
