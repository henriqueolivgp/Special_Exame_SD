// Imports
const userService = require('../services/user.service')
const UserModel = require('../models/user.model')

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error retrieving users');
  }
};

const verifyRegister = async (req, res) => {
  try {
    const { username, password } = req.body
    console.log(username, password)
    
    await userService.register(username, password)
    res.status(200).json({ message: 'User make a sucefull sign-up' })
  } catch (error) {

  }
}

module.exports = { getAllUsers, verifyRegister };
