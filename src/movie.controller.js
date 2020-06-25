import Movie from './movie.model.js';

const movieController = {};

movieController.create = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.json(movie);
  } catch {
    res.status(500).send('Server Error');
  }
};

movieController.find = async (req, res) => {
  try {
    const movies = await Movie.find(req.body);
    res.json(movies);
  } catch {
    res.status(500).send('Server Error');
  }
};

movieController.getById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).send('Movie not found');
    }
  } catch {
    res.status(500).send('Server Error');
  }
};

movieController.update = async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.params.id, req.body);
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch {
    res.status(500).send('Server Error');
  }
};

movieController.delete = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch {
    res.status(500).send('Server Error');
  }
};

export default movieController;
