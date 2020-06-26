import express from 'express';
import bodyParser from 'body-parser';
import movieRoutes from './movies/movie.routes.js';
import userRoutes from './users/user.routes.js';

const server = express();
const endpoint = '/api';

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(endpoint, movieRoutes);
server.use(endpoint, userRoutes);

export default server;
