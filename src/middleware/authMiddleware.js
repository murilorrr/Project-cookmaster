const dotenv = require('dotenv');

const status = require('http-status-codes').StatusCodes;
const JWT = require('jsonwebtoken');
const { myError } = require('../utils');

dotenv.config();

const secret = process.env.SECRET || 'segredinho';

const authMiddleware = (req, res, next) => {
  let token;
  try {
    const { authorization } = req.headers;
    token = authorization;
    
    const decoded = JWT.verify(token, secret);
    const { _id: id } = decoded.data[0];
    req.headers.id = id;
  } catch (err) {
    if (!token) throw myError(status.UNAUTHORIZED, 'missing auth token');
    throw myError(status.UNAUTHORIZED, 'jwt malformed');
  }

  return next();
};

module.exports = authMiddleware;
