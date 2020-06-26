import express from 'express';
import authenticationController from './authentication.controller.js';

const authenticateRroute = express.Router();

authenticateRroute.use(authenticationController.verifyToken);

export default authenticateRroute;
