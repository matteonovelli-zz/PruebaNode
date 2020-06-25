import express from 'express';
import movieController from './movie.controller.js';

const endpoint = '/movies';
const movieRoutes = express.Router();

movieRoutes.get(endpoint, movieController.find);
movieRoutes.get(`${endpoint}/:id`, movieController.getById);
movieRoutes.post(endpoint, movieController.create);
movieRoutes.put(endpoint, movieController.update);
movieRoutes.delete(`${endpoint}/:id`, movieController.delete);

export default movieRoutes;
