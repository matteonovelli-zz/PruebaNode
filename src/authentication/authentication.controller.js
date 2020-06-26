import jwt from 'jsonwebtoken';
import constants from '../utils/constants.js';

const authenticationController = {};

authenticationController.verifyToken = async (req, res, next) => {
  const token = req.headers['access-token'];
  if (token) {
    try {
      req.decoded = await jwt.verify(token, constants.jwt_key);
      next();
    } catch {
      res.status(500).send('Server error');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
}

export default authenticationController;
