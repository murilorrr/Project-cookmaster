const status = require('http-status-codes').StatusCodes;
const service = require('../service/recipeService');

const getAll = async (req, res) => {
  const getOperation = await service.getAll();
  res.status(200).json(getOperation);
};

const insertOne = async (req, res, next) => {
  const { name, ingredients, preparation } = await req.body;
  const { id: userId } = await req.headers;
  const product = { name, ingredients, preparation, userId };
  try {
    const insertOperation = await service.insertOne(product);
    return res.status(status.CREATED).json({ recipe: insertOperation });
  } catch (err) {
    return next(err);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getOperation = await service.getById(id);
    return res.status(200).json(getOperation);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAll,
  insertOne,
  getById,
};
