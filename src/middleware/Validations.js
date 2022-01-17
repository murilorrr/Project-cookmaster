const status = require('http-status-codes').StatusCodes;
const user = require('../model/Operations')('users');
const { myError } = require('../utils');

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailAlreadyExists = async (email) => {
  const result = await user.getOneByEmail(email)
  .then((data) => data.length > 0)
  .catch((err) => err);
  return result;
};

const nameValidation = (name) => {
  if (!name) throw myError(status.BAD_REQUEST, 'Invalid entries. Try again.');
};

const emailValidation = async (email) => {
  if (!regexEmail.test(email)) throw myError(status.BAD_REQUEST, 'Invalid entries. Try again.');
  const exists = await (emailAlreadyExists(email));
  if (exists) throw myError(status.CONFLICT, 'Email already registered');
};

const PasswordRequire = (password) => {
  if (!password) throw myError(status.BAD_REQUEST, 'Invalid entries. Try again.');
};

module.exports = {
  nameValidation,
  emailValidation,
  PasswordRequire,
};
