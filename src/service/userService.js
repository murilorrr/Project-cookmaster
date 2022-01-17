const user = require('../model/Operations')('users');
const { nameValidation, emailValidation, PasswordRequire } = require('../middleware/Validations');
// const Joi = require('joi');
// const statusCODE = require('http-status-codes').StatusCodes;

// const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// const ObjError = (status) => ({
//   status,
//   message: 'Invalid entries. Try again.',
// });

// const joiObjInsert = Joi.object({
//   name: Joi.string(),
//   email: Joi.string().regex(regexEmail),
// });

// const validateName = (product) => {
//   const { name } = product;
//   try {
//     joiObjInsert.validate(name);
//     return true;
//   } catch (err) {
//     throw new ObjError(statusCODE.BAD_REQUEST);
//   }
// };

// const validateEmail = (product) => {
//   const { email } = product;
//   try {
//     joiObjInsert.validate(email);
//     return true;
//   } catch (err) {
//     throw new ObjError(statusCODE.BAD_REQUEST);
//   }
// };

const insertOne = async (product) => {
  const { name, email, password } = product;
  nameValidation(name);
  await emailValidation(email);
  PasswordRequire(password);

  const insertOperation = await user.insertOne(product);
  delete insertOperation.password;
  return insertOperation || null;
};

const getOneByEmail = async (email) => {
  const getOperation = await user.getOneByEmail(email);
  if (getOperation.length === 0) {
    return null;
  }
  return getOperation;
};

module.exports = {
  insertOne,
  getOneByEmail,
};
