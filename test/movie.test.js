import mongoose from 'mongoose';
import Movie from '../model/movie';
const testData = { title: 'Back to the future', year: 1985, director: 'Robert Zemeckis' };

describe('Films Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (error) => {
      if (error) {
        console.error(error);
        process.exit(1);
      }
    });
    console.log('Conexón a la base de datos realizada...');
  });

  test('Add a movie', async () => {
    const movie = new Movie(testData);
    const sut = await movie.save();
    expect(sut._id).toBeDefined();
    expect(sut.title).toBe(movie.title);
    expect(sut.year).toBe(movie.year);
    expect(sut.director).toBe(movie.director);
  });
});
