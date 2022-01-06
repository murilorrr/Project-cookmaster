const user = require('../model/Operations')('users');

const insertOne = async (product) => {
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
