const crypto = require('crypto');
const knexConfig = require('../knexfile').db;
const knex = require('knex')(knexConfig);
const jwt = require('jsonwebtoken');

const getAllUsers = async () => {
    try {
        const users = await knex.select('*').from('users');
        return users;
    } catch (error) {
        throw new Error('Error searching all users');
    }
};

const register = async (username, password) => {
    try {
        console.log('Iniciando registro de usuário'); // Log de início

        // Verifica se o usuário já existe
        console.log('Verificando se o usuário já existe');
        const existingUser = await knex('users').where({ username }).first();
        if (existingUser) {
            throw new Error('This username já está em uso.');
        }

        // Cria o hash da senha em sha256
        console.log('Criando hash da senha');
        const passwordHashed = crypto.createHash('sha256').update(password).digest('hex');

        const [role] = await knex('roles').where({ typeRole: 'view' }).select('id');
        const roleId = role.id;

        // Insere o novo usuário no banco de dados
        console.log('Inserindo usuário no banco de dados');
        await knex('users').insert({
            username,
            password: passwordHashed,
            role_id: roleId,
        });

        console.log('Usuário registrado com sucesso'); // Log de sucesso
        return { message: 'User registered successfully' };
    } catch (error) {
        console.error('Erro ao registrar usuário:', error.message); // Log de erro
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
            throw new Error('Invalid credentials');
        }

        console.log('Usuário autenticado com sucesso'); // Log de sucesso

        const token = jwt.sign({}, 'sd', { expiresIn: '1d', subject: user.id.toString() });
        // console.log(token);
        return { token, user };
    } catch (error) {
        console.error('Erro ao fazer login:', error.message); // Log de erro
        throw new Error('Error during login: ' + error.message);
    }
};

// const updateUser = async () => {
//     try {
//         const user = await knex('users').where({ id: userId }).first();
//         if (!user) {
//             throw new Error('User not found');
//         }

//         const userUpdate = {
//             uername: ,
//             password: ,
//             role: ,
//         }

//     } catch (error) {
        
//     }
// }

module.exports = {
    getAllUsers,
    register,
    login,
    update
};
