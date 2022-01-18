const Joi = require('joi');
const status = require('http-status-codes').StatusCodes;
const recipes = require('../model/Operations')('recipes');
const user = require('../model/Operations')('users');
const { myError } = require('../utils');

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
  urlImg: Joi.string(),
  userId: Joi.string().required(),
});

const editRecipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
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
  if (!getOperation) {
    throw myError(status.NOT_FOUND, 'recipe not found');
  }
  return getOperation;
};

const editRecipe = async (recipe, id, userId) => {
  const { error } = editRecipeSchema.validate(recipe);
  if (error) throw myError(status.BAD_REQUEST, 'invalid formt');
  const receita = await recipes.getById(id);
  const isAdm = await user.getById(userId);
  if (receita.userId === userId || isAdm.role === 'admin') {
    const result = await recipes.updateOne(recipe, id);

    return result >= 1 ? { ...receita, ...recipe } : myError(status.BAD_REQUEST, 'nada modificado');
  } 
  throw myError(status.UNAUTHORIZED, 'voce não é o dono pilantra');
};

const deleteOne = async (id, userId) => {
  const receita = await recipes.getById(id);
  const isAdm = await user.getById(userId);
  if (receita.userId === userId || isAdm.role === 'admin') {
    const deleteOperation = await recipes.deleteOne(id);
    return deleteOperation;
  }
  throw myError(status.UNAUTHORIZED, 'voce não é o dono pilantra');
};

module.exports = {
  getAll,
  insertOne,
  getById,
  editRecipe,
  deleteOne,
};