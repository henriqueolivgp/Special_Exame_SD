const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

// Define as rotas
router.get('/users', userController.getAllUsers);

router.get('/register', userController.verifyRegister);


module.exports = router;
