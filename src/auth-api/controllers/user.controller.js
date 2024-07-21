// Imports
const userService = require('../services/user.service')
const UserModel = require('../models/user.model')
const cookieParser = require("cookie-parser");

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
    const { username, password, } = req.body;
    // console.log(username, password)

    await userService.register(username, password)
    res.status(200).json({ message: 'User make a sucefull sign-up' })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const verifyLogin = async (req, res) => {
  try {
    // console.log('entrei no controller')
    const { username, password } = req.body;
    const { token, user } = await userService.login(username, password);
    // console.log('antes dos cookies')
    res.cookie('token', token, { httpOnly: true });
    // console.log('depois dos cookies')

    res.status(200).json({ message: 'User successfully logged in', user });
  } catch (error) {
    // console.error('Erro ao fazer login:', error.message);
    res.status(400).json({ error: error.message });
  }
}

const verifyLogOut = async (req,res) => {
  try {
    const result = userService.logOut(res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
}

const verifyUpdateUser = async (req, res) => {
  const { id } = req.params
  const { newUsername, newRole } = req.body;

  // Verifica se todos os campos necessários foram fornecidos
  if ( !newUsername || !newRole) {
      return res.status(400).json({ message: 'Todos os campos são necessários' });
  }

  try {
      const result = await userService.updateUser(id, newUsername, newRole);
      return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

// controller
const deleteUser = async (req, res) => {
  const { id: userId } = req.params; // Corrigido para corresponder ao nome do parâmetro na rota
  try {
    const result = await userService.deleteUser(userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getAllUsers, verifyRegister, verifyLogin, verifyLogOut, verifyUpdateUser, deleteUser };
