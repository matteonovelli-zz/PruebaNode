import express from 'express';
import movieController from './movie.controller';

const endpoint = 'movies';
const movieRoutes = express.Router();

movieRoutes.get(endpoint, movieController.retrieve);
movieRoutes.post(endpoint, movieController.create);
movieRoutes.update(endpoint, movieController.update);
movieRoutes.delete(endpoint, movieController.delete);

export default movieRoutes;
