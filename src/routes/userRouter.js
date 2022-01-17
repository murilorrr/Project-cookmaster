const { Router } = require('express');
const userController = require('../controller/userController');

const router = Router();

router.post('/', userController.insertOne);

router.get('/', (req, res) => {
  res.send(`agora sao ${Date.now()}`);
}); // okserver

module.exports = router;