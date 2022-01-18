const { Router } = require('express');
const multer = require('multer');
const recipesController = require('../controller/recipesController');
const authMiddleware = require('../middleware/authMiddleware');

const route = Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/uploads');
  },

  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });
route.get('/', recipesController.getAll);
route.post('/', authMiddleware, recipesController.insertOne);
route.get('/:id', recipesController.getById);
route.put('/:id', authMiddleware, recipesController.editRecipe);
route.delete('/:id', authMiddleware, recipesController.deleteRecipe);
route.put('/:id/image', authMiddleware, upload.single('image'), recipesController.insertImage);

module.exports = route;