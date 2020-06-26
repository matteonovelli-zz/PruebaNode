import User from './user.model.js';
import jwt from 'jsonwebtoken';
import constants from '../utils/constants.js';

const userController = {};

userController.create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

userController.authenticate = async (req, res) => {
  try {
    if (!req.body.username) {
      res.status(400).send('Bad request');
      return;
    }

    if (!req.body.password) {
      res.status(400).send('Bad request');
      return;
    }

    const user = await User.findOne(req.body);

    if (user) {
      const token = jwt.sign({ username: user.username }, constants.jwt_key, { expiresIn: 1440 });
      res.json({ token });
    } else {
      res.status(404).send('User not found');
    }
  } catch {
    res.status(500).send('Server Error');
  }
};

export default userController;
