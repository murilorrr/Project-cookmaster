const { Router } = require('express');
const userController = require('../controller/userController');
const {
  nameValidation,
  emailValidation,
  PasswordRequire,
} = require('../middleware/Validations');

const router = Router();

router.post('/', nameValidation, emailValidation, PasswordRequire, userController.insertOne);

router.get('/', (req, res) => {
  res.send('ok');
}); // okserver

module.exports = router;