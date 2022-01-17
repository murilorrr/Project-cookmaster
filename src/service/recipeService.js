const Joi = require('joi');
const status = require('http-status-codes').StatusCodes;
const recipes = require('../model/Operations')('recipes');
const { myError } = require('../utils');

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
  urlImg: Joi.string(),
  userId: Joi.string().required(),
});

const validateRecipe = (recipe) => {
  const { error } = recipeSchema.validate(recipe);
  if (error) throw myError(status.BAD_REQUEST, 'Invalid entries. Try again.');
};

const getAll = async () => {
  const getOperation = await recipes.getAll();
  if (getOperation.length === 0) {
    return null;
  }
  return getOperation || null;
};

const insertOne = async (recipe) => {
  validateRecipe(recipe);

  const insertOperation = await recipes.insertOne(recipe);
  return insertOperation || null;
};

const getById = async (id) => {
  const getOperation = await recipes.getById(id);
  console.log(getOperation);
  if (!getOperation) {
    throw myError(status.NOT_FOUND, 'recipe not found');
  }
  return getOperation;
};

module.exports = {
  getAll,
  insertOne,
  getById,
};