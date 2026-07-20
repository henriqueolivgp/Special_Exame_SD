// const crypto = require('crypto');
const knexConfig = require('../knexfile').db;
const knex = require('knex')(knexConfig);
// const jwt = require('jsonwebtoken');

const getAllUsers = async () => {
    try {
        const users = await knex.select('id', 'username', 'role', 'created_at', 'updated_at').from('users');
        return users;
    } catch (error) {
        throw new Error('Error searching all users');
    }
};

// const register = async (username, password) => {
//     try {
//         console.log('Iniciando registro de usuário'); // Log de início

//         // Verifica se o usuário já existe
//         console.log('Verificando se o usuário já existe');
//         const existingUser = await knex('users').where({ username }).first();
//         if (existingUser) {
//             throw new Error('This username já está em uso.');
//         }

//         // Cria o hash da senha em sha256
//         console.log('Criando hash da senha');
//         const passwordHashed = crypto.createHash('sha256').update(password).digest('hex');

//         const [role] = await knex('roles').where({ typeRole: 'view' }).select('id');
//         const roleId = role.id;

//         // Insere o novo usuário no banco de dados
//         console.log('Inserindo usuário no banco de dados');
//         await knex('users').insert({
//             username,
//             password: passwordHashed,
//             role_id: roleId,
//         });

//         console.log('Usuário registrado com sucesso'); // Log de sucesso
//         return { message: 'User registered successfully' };
//     } catch (error) {
//         console.error('Erro ao registrar usuário:', error.message); // Log de erro
//         throw new Error('Error in sign-up user: ' + error.message);
//     }
// };

// const login = async (username, password) => {
//     try {
//         // console.log('Iniciando login de usuário'); 

//         const user = await knex('users').where({ username }).first();
//         if (!user) {
//             throw new Error('Invalid credentials');
//         }

//         // Hash da senha fornecida e comparação com a senha armazenada
//         console.log('Criando hash da senha para comparação');
//         const passwordHashed = crypto.createHash('sha256').update(password).digest('hex');

//         if (user.password !== passwordHashed) {
//             throw new Error('Invalid credentials');
//         }

//         console.log('Usuário autenticado com sucesso'); // Log de sucesso

//         const token = jwt.sign({}, 'sd', { expiresIn: '1d', subject: user.id.toString() });
//         // console.log(token);
//         return { token, user };
//     } catch (error) {
//         console.error('Erro ao fazer login:', error.message); // Log de erro
//         throw new Error('Error during login: ' + error.message);
//     }
// };

const logOut = async (res) => {
    try {
        res.clearCookie('token');
        return { message: 'Logout successful' };
    } catch (error) {
        throw new Error('Error in logOut User')
    }
}

const updateUser = async (id, newUsername, newRole) => {
    try {
        console.log('Inicio update de utilizador');

        // Verifica se o novo nome de usuário já está em uso por OUTRO utilizador
        console.log('A verificar se o novo nome de utilizador já está em uso');
        const existingUser = await knex('users').where({ username: newUsername }).first();
        if (existingUser && String(existingUser.id) !== String(id)) {
            throw new Error('Este nome de utilizador já está em uso.');
        }

        const userExists = await knex('users').where({ id: id }).first();
        if (!userExists) {
            throw new Error('Utilizador não encontrado.');
        }
        console.log('User encontrado com o id:' + id)

        const validRoles = ['admin', 'view', 'edit'];
        if (!validRoles.includes(newRole)) {
            throw new Error('Role inválido. Os roles permitidos são: admin, view, edit.');
        }

        // Atualiza o usuário no banco de dados (a tabela 'users' guarda o role diretamente,
        // não existe tabela 'roles' nem coluna 'role_id')
        console.log('A atualizar utilizador no banco de dados');
        const updated = await knex('users')
            .where({ id: id })
            .update({
                username: newUsername,
                role: newRole,
            });

        if (updated === 0) {
            throw new Error('Nenhum utilizador foi encontrado para atualizar.');
        }

        console.log('Utilizador atualizado com sucesso');
        return { message: 'User updated successfully' };
    } catch (error) {
        console.error('Erro ao atualizar utilizador:', error.message);
        throw new Error('Error updating user: ' + error.message);
    }
};



// service
const deleteUser = async (id) => {
    try {
        const user = await knex('users').where({ id: id }).del();
        if (!user) {
            throw new Error('User not found');
        }
        return { message: 'User has been deleted successfully' };
    } catch (error) {
        throw new Error('Error in deleting user');
    }
};


module.exports = {
    getAllUsers,
    // register,
    // login,
    logOut,
    updateUser,
    deleteUser,
};
