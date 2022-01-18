const statusCODE = require('http-status-codes').StatusCodes;
const Joi = require('joi');
const userModel = require('../model/Operations')('users');
const { myError } = require('../utils');

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().regex(regexEmail).required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

const emailAlreadCreated = async (email) => {
  const getOperation = await userModel.getOneByEmail(email);
  if (getOperation[0]) throw myError(statusCODE.CONFLICT, 'Email already registered');
};

const validateUser = (user) => {
  const { error } = schema.validate(user);
  if (error) throw myError(statusCODE.BAD_REQUEST, 'Invalid entries. Try again.');
};

const insertOne = async (user) => {
  const { email } = user;
  validateUser(user);
  await emailAlreadCreated(email);

  const insertOperation = await userModel.insertOne(user);
  delete insertOperation.password;
  return insertOperation || null;
};

const insertOneAdmin = async (user, id) => {
  const { email } = user;
  validateUser(user);
  await emailAlreadCreated(email);
  const getOperation = await userModel.getById(id);
  if (getOperation.role !== 'admin') {
    throw myError(statusCODE.FORBIDDEN, 'Only admins can register new admins'); 
  }

  const insertOperation = await userModel.insertOne(user);
  delete insertOperation.password;
  return insertOperation || null;
};

module.exports = {
  insertOne,
  insertOneAdmin,
};
