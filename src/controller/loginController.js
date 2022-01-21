const dotenv = require('dotenv');

dotenv.config();
const status = require('http-status-codes').StatusCodes;
const service = require('../service/loginService');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await service.getTokenUser(email, password);
    return res.status(status.OK).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateLogin,
};