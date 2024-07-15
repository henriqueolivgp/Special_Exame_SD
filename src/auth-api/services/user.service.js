const crypto = require('crypto');
const knex = require('../knexfile').db;

// const crypto = require('crypto');
// const hash = crypto.createHash('sha256');
//     hash.update(password);
//     const resultadoHash = hash.digest('hex');
//     await knex('users').insert({
//       username,
//       password: resultadoHash,
//       permission
//     });

class User {

    static async getAllUsers () {
        try {
            const users = await knex.select('*').from('users');
            return users;
        } catch (error) {
            throw new Error('Error ao buscar  users');
        }
    };

    registerUser = async () => {
        try {
            const { username, email, password } = userData;

            const hash = crypto.createHash('sha256');
            hash.update(password);
            const resultadoHash = hash.digest('hex');
            await knex('users').insert({
                username,
                password: resultadoHash,
                // permission
            });

            return { username };
        } catch (error) {
            console.error('Error registering user:', error);
            throw new Error('Error registering user');
        }
    };

    getUserById = async (id) => {
        try {
            const user = await knex('users').where({ id }).first();
            return user;
        } catch (error) {
            throw new Error('Error retrieving user');
        }
    };

    deleteUser = async (user_id) => {
        try {
            const user = await knex('users').where({ user_id }).del();
            return user;
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }
}

// Add more user-related services as needed

module.exports = User;
