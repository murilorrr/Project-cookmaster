const dotenv = require('dotenv');

const status = require('http-status-codes').StatusCodes;
const JWT = require('jsonwebtoken');
const { myError } = require('../utils');

dotenv.config();

const secret = process.env.SECRET || 'segredinho';

const authMiddleware = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    
    const decoded = JWT.verify(token, secret);
    const { _id: id } = decoded.data[0];
    req.headers.id = id;
  } catch (err) {
    throw myError(status.UNAUTHORIZED, 'jwt malformed');
  }

  return next();
};

module.exports = authMiddleware;
