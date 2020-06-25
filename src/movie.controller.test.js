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
      useNewUrlParser: true
    });
    console.log('Conexión a la base de datos establecida...');
  });

  test('Create a movie', async () => {
    const res = mockResponse();
    await movieController.create({ body: testData }, res);
    expect(res.json).toBeCalledTimes(1);
    const movie = res.json.mock.calls[0][0];
    expect(movie.title).toBe('Back to the future');
    createdMovieId = movie._id;
  });

  test('Retrieve a movie', async () => {
    const res = mockResponse();
    await movieController.retrieve({ body: { title: 'Back to the future' } }, res);
    expect(res.json).toBeCalledTimes(1);
    const movies = res.json.mock.calls[0][0];
    expect(movies[0]._id).toEqual(createdMovieId);
  });

  test('Update a movie', async () => {
    const res = mockResponse();
    await movieController.update({ params: { id: createdMovieId }, body: { ...testData, year: 1986 } }, res);
    expect(res.json).toBeCalledTimes(1);
    const movie = res.json.mock.calls[0][0];
    expect(movie._id).toEqual(createdMovieId);
    expect(movie.year).toBe(1986);
  });

  test('Delete a movie', async () => {
    const res = mockResponse();
    await movieController.delete({ params: { id: createdMovieId } }, res);
    expect(res.send).toBeCalledTimes(1);
    expect(res.send).toBeCalledWith();
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(204);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    console.log('Conexión a la base de datos cerrada...');
  });
});
