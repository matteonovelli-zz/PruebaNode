import Movie from './movie';

const movieController = {};

movieController.create = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.json(movie);
  } catch {
    res.status(500).send('Server Error');
  }
};

movieController.retrieve = async (req, res) => {
  try {
    const movies = await Movie.find(req.body);
    res.json(movies);
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
    await Movie.findByIdAndDelete(req.params.id, req.body);
    res.status(204);
  } catch {
    res.status(500).send('Server Error');
  }
};

export default movieController;
