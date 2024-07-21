const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const verifyAuth = require('../middleware/verifyAuth')
const verifyRoles = require('../middleware/verifyRoles')

// Define as rotas
router.get('/users', verifyRoles(['admin']), verifyAuth, userController.getAllUsers);

// router.post('/register', userController.verifyRegister);

// router.post('/login', userController.verifyLogin);

router.post('/user/logout', userController.verifyLogOut)

router.put('/users/:id', verifyRoles(['admin']), verifyAuth, userController.verifyUpdateUser);

router.delete('/user/:id', verifyRoles(['admin']), verifyAuth,  userController.deleteUser)

module.exports = router;
