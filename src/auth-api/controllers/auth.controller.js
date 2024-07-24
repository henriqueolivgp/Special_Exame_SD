const authService = require('../services/auth.service')

const verifyRegister = async (req, res) => {
  try {
    const { username, password, role = 'admin' } = req.body;
    console.log(username, password, role)

    await authService.register(username, password, role)
    res.status(200).json({ message: 'User make a sucefull sign-up' })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const verifyLogin = async (req, res) => {
  try {
    // console.log('entrei no controller')
    const { username, password } = req.body;
    const { token, user } = await authService.login(username, password);
    // console.log('antes dos cookies')
    res.cookie('token', token, { httpOnly: true });
    // console.log('depois dos cookies')

    res.status(200).json({ message: 'User successfully logged in', user });
  } catch (error) {
    // console.error('Erro ao fazer login:', error.message);
    res.status(400).json({ error: error.message });
  }
}

module.exports = { verifyRegister, verifyLogin};