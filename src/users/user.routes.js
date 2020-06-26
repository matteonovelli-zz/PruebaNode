import express from 'express';
import userController from './user.controller.js';

const endpoint = '/users';
const userRoutes = express.Router();

userRoutes.post(`${endpoint}/authenticate`, userController.authenticate);
userRoutes.post(`${endpoint}/register`, userController.create)

export default userRoutes;
