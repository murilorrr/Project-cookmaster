const login = require('../model/Operations')('users');

const getUser = async (email, senha) => {
  const getOperation = await login.getUser(email, senha);
  if (getOperation.length === 0) {
    return null;
  }
  return getOperation;
};

module.exports = {
  getUser,
};