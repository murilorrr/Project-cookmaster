const { Router } = require('express');
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.post('/', userController.insertOne);
router.post('/admin', authMiddleware, userController.insertOneAdmin);

router.get('/', (req, res) => {
  res.send(`agora sao ${Date.now()}`);
}); // okserver

module.exports = router;