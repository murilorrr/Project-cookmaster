const statusCODE = require('http-status-codes').StatusCodes;
const Joi = require('joi');
const user = require('../model/Operations')('users');
const { myError } = require('../utils');

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().regex(regexEmail).required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

const emailAlreadCreated = async (email) => {
  const getOperation = await user.getOneByEmail(email);
  if (getOperation[0]) throw myError(statusCODE.CONFLICT, 'Email already registered');
};

const validateProduct = (product) => {
  const { error } = schema.validate(product);
  if (error) throw myError(statusCODE.BAD_REQUEST, 'Invalid entries. Try again.');
};

const insertOne = async (product) => {
  const { email } = product;
  validateProduct(product);
  await emailAlreadCreated(email);

  const insertOperation = await user.insertOne(product);
  delete insertOperation.password;
  return insertOperation || null;
};

module.exports = {
  insertOne,
};
