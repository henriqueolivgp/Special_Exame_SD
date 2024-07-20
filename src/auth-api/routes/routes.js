const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const verifyAuth = require('../middleware/verifyAuth')

// Define as rotas
router.get('/users', verifyAuth,userController.getAllUsers);

router.post('/register', userController.verifyRegister);

router.post('/login', userController.verifyLogin)

module.exports = router;
