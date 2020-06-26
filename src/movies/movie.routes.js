import express from 'express';
import movieController from './movie.controller.js';
import authenticateRroute from '../authentication/authentication.routes.js';

const endpoint = '/movies';
const movieRoutes = express.Router();

movieRoutes.get(endpoint, authenticateRroute, movieController.find);
movieRoutes.get(`${endpoint}/:id`, authenticateRroute, movieController.getById);
movieRoutes.post(endpoint, authenticateRroute, movieController.create);
movieRoutes.put(endpoint, authenticateRroute, movieController.update);
movieRoutes.delete(`${endpoint}/:id`, authenticateRroute, movieController.delete);

export default movieRoutes;
