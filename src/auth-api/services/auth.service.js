const crypto = require('crypto');
const knexConfig = require('../knexfile').db;
const knex = require('knex')(knexConfig);
const jwt = require('jsonwebtoken');

const validRoles = ['admin', 'view', 'edit'];

const register = async (username, password, role = 'admin') => {
  try {
    console.log('A comecar registro de utilizador'); // Log de início
    // Verifica se o usuário já existe
    console.log('Verificando se o usuário já existe');
    const existingUser = await knex('users').where({ username }).first();
    if (existingUser) {
      throw new Error('Este username já está em uso.');
    }

    if (!validRoles.includes(role)) {
      throw new Error('Role inválido. Os roles permitidos são: admin, view, edit.');
    }
    // Cria o hash da senha em sha256
    console.log('A criar a hash da senha fornecida');
    const passwordHashed = crypto.createHash('sha256').update(password).digest('hex');

    // Insere o novo usuário no banco de dados
    console.log('A inserir utilizador na bd');
    await knex('users').insert({
      username,
      password: passwordHashed,
      role: role,
    });

    console.log('Usuário registrado com sucesso'); // Log de sucesso
    return { message: 'User registered successfully' };
  } catch (error) {
    throw new Error('Error in sign-up user: ' + error.message);
  }
};

const login = async (username, password) => {
  try {
    // console.log('Iniciando login de usuário'); 

    const user = await knex('users').where({ username }).first();
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Hash da senha fornecida e comparação com a senha armazenada
    console.log('Criando hash da senha para comparação');
    const passwordHashed = crypto.createHash('sha256').update(password).digest('hex');

    if (user.password !== passwordHashed) {
      throw new Error('Invalid password. Pls try again or resete you password');
    }

    console.log('Usuário autenticado com sucesso'); // Log de sucesso

    console.log(user.role)

    // craicao de um objeto que vai conter algun dados importantes do utilizador
    const tokenPayload = {
      role: user.role,
    }

    const token = jwt.sign({ tokenPayload }, 'sd', { expiresIn: '1d', subject: user.id.toString() });
    console.log(token);
    
    return { token, user };
  } catch (error) {
    throw new Error('Error during login: ' + error.message);
  }
};

module.exports = { register, login }