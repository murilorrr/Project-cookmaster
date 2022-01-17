const dotenv = require('dotenv');

dotenv.config();
const status = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');
const service = require('../service/loginService');

const secret = process.env.SECRET || 'segredinho';

const JWTConfig = {
  expiresIn: '1hr',
  algorithm: 'HS256',
};

const verifyUser = (user, res) => {
  if (!user) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Incorrect username or password' });
  }
};

const verifyEMailPassaword = (email, senha, res) => {
  if (!email || !senha) {
    return res.status(status.UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
};

const validateLogin = async (req, res) => {
  const { email, password } = req.body;

  verifyEMailPassaword(email, password, res);

  const user = await service.getUser(email, password);

  verifyUser(user, res);

  const token = jwt.sign({ data: user }, secret, JWTConfig);

  return token
    ? res.status(status.OK).json({ token })
    : res.status(status.NOT_FOUND).json({ message: 'Json null' });
};

module.exports = {
  validateLogin,
};