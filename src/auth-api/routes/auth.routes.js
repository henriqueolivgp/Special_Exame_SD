const express = require('express')
const router = express.Router();
const userController = require('../controllers/auth.controller')

router.post('/register', userController.verifyRegister);

router.post('/login', userController.verifyLogin);

module.exports = { authRoutes: router };