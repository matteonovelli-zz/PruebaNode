import express from 'express';
import bodyParser from 'body-parser';
import movieRoutes from './movie.routes.js';

const server = express();
const endpoint = 'api';

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(`/${endpoint}`, movieRoutes);

export default server;
