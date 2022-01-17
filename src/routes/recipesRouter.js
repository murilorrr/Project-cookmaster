const { Router } = require('express');
const recipesController = require('../controller/recipesController');
const authMiddleware = require('../middleware/authMiddleware');

const route = Router();

route.get('/', recipesController.getAll);
route.post('/', authMiddleware, recipesController.insertOne);
route.get('/:id', recipesController.getById);

module.exports = route;