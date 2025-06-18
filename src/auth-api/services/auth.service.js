const crypto = require('crypto');
const knexConfig = require('../knexfile').db;
const knex = require('knex')(knexConfig);
const jwt = require('jsonwebtoken');

const validRoles = ['admin', 'view', 'edit'];

const register = async (username, password, role = 'admin') => {
  try {
    // Verifica se o usuário já existe
    const existingUser = await knex('users').where({ username }).first();
    if (existingUser) {
      throw new Error('Este username já está em uso.');
    }

    if (!validRoles.includes(role)) {
      throw new Error('Role inválido. Os roles permitidos são: admin, view, edit.');
    }
    // Cria o hash da senha em sha256
    const passwordHashed = crypto.createHash('sha256').update(password).digest('hex');

    // Insere o novo usuário no banco de dados
    await knex('users').insert({
      username,
      password: passwordHashed,
      role: role,
    });

    return { message: 'User registered successfully' };
  } catch (error) {
    throw new Error('Error in sign-up user: ' + error.message);
  }
};

const login = async (username, password) => {
  try {
    // console.log('Iniciando login de usuário'); 

    const user = await knex('users').where({ username }).first();

    // Hash da senha fornecida e comparação com a senha armazenada
    const passwordHashed = crypto.createHash('sha256').update(password).digest('hex');

    if (user.password !== passwordHashed && !user) {
      throw new Error('Invalid credentials. Pls check the inputs!!');
    }

    // craicao de um objeto que vai conter algun dados importantes do utilizador
    const tokenPayload = {
      role: user.role,
    }

    const token = jwt.sign({ tokenPayload }, 'sd', { expiresIn: '1d', subject: user.id.toString() });
    
    return { token, user };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { register, login }