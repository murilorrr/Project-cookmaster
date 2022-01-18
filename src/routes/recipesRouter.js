const { Router } = require('express');
const multer = require('multer');
const express = require('express');
const path = require('path');
const recipesController = require('../controller/recipesController');
const authMiddleware = require('../middleware/authMiddleware');

const route = Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },

  filename: (req, file, callback) => {
    const { id } = req.params;
    console.log('----ID-----', id);
    callback(null, `${id}.png`);
  },
});

const upload = multer({ storage });
route.use('/:id/images', express.static(path.join(`${__dirname}/../uploads`)));
route.get('/', recipesController.getAll);
route.post('/', authMiddleware, recipesController.insertOne);
route.get('/:id', recipesController.getById);
route.put('/:id', authMiddleware, recipesController.editRecipe);
route.delete('/:id', authMiddleware, recipesController.deleteRecipe);
route.put('/:id/image', authMiddleware, upload.single('image'), recipesController.insertImage);
module.exports = route;