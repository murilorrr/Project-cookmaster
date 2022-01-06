const status = require('http-status-codes').StatusCodes;
const service = require('../service/userService');

const insertOne = async (req, res) => {
  const { name, email, password } = req.body;
  let result;
  try {
    result = await service.insertOne({ name, email, password, role: 'user' });
  } catch (error) {
    return res.status(status.BAD_REQUEST).json({ message: error.message });
  }
  return result
    ? res.status(status.CREATED).json({ user: result })
    : res.status(status.NOT_FOUND).json({ message: 'Json null' });
};

module.exports = {
  insertOne,
};
