const status = require('http-status-codes').StatusCodes;
const service = require('../service/userService');

const insertOne = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const result = await service.insertOne({ name, email, password, role: 'user' });

    return result
      ? res.status(status.CREATED).json({ user: result })
      : res.status(status.NOT_FOUND).json({ message: 'Json null' });
  } catch (error) {
    return next(error);
  }
};

const insertOneAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.headers;

    const result = await service.insertOneAdmin({ name, email, password, role: 'admin' }, id);

    return result
      ? res.status(status.CREATED).json({ user: result })
      : res.status(status.NOT_FOUND).json({ message: 'Json null' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  insertOne,
  insertOneAdmin,
};
