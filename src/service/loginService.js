const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();
const status = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');
const login = require('../model/Operations')('users');

const secret = process.env.SECRET || 'segredinho';
const { myError } = require('../utils');

const JWTConfig = {
  expiresIn: '1hr',
  algorithm: 'HS256',
};

const schema = Joi.object({
  email: Joi.string().required(),
  senha: Joi.string().required(),
});

const getTokenUser = async (email, senha) => {
  const { error } = schema.validate({ email, senha });
  if (error) throw myError(status.UNAUTHORIZED, 'All fields must be filled');
  
  const user = await login.getUser(email, senha);
  if (!user[0]) throw myError(status.UNAUTHORIZED, 'Incorrect username or password');
  
  const token = jwt.sign({ data: user }, secret, JWTConfig);
  return token;
};

module.exports = {
  getTokenUser,
};