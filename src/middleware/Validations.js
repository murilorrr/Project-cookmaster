const status = require('http-status-codes').StatusCodes;
const service = require('../service/userService');

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailAlreadyExists = async (email, res, next) => {
  const getOperation = await service.getOneByEmail(email);
  return getOperation ? res
  .status(status.CONFLICT).json({ message: 'Email already registered' }) : next();
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  return name ? next() : res
  .status(status.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
};

const emailValidation = (req, res, next) => {
  try {
    const { email } = req.body;
    return regexEmail.test(email) ? emailAlreadyExists(email, res, next) : res
      .status(status.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  } catch (err) {
    console.log(err);
    return res.status(status.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
};

const PasswordRequire = (req, res, next) => {
  const { password } = req.body;
  return password ? next() : res
  .status(status.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
};

module.exports = {
  nameValidation,
  emailValidation,
  PasswordRequire,
};
