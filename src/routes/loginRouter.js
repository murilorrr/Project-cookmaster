const { Router } = require('express');
const loginController = require('../controller/loginController');

const router = Router();

router.post('/', loginController.validateLogin);

router.get('/', (req, res) => {
  res.send('ok');
}); // okserver

module.exports = router;