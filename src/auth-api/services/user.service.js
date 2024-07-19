const crypto = require('crypto');
const { password } = require('../models/user.model');
const knexConfig = require('../knexfile').db;
const knex = require('knex')(knexConfig);

// const crypto = require('crypto');
// const hash = crypto.createHash('sha256');
//     hash.update(password);
//     const resultadoHash = hash.digest('hex');
//     await knex('users').insert({
//       username,
//       password: resultadoHash,
//       permission
//     });

const getAllUsers = async () => {
    try {
        const users = await knex.select('*').from('users');
        return users;
    } catch (error) {
        throw new Error('Error searching all users')
    }
};

const register = async () => {
    try {
        // const existingUser = await knex('users').where({ username }).first();
        // if (existingUser) {
        //     return res.status(400).json({ error: 'This username já está em uso.' });
        // }
        console.log('entrei')
        const passwordHashed = crypto.createHash('sha256').update(password).digest('hex');

        console.log(passwordHashed)
        await knex('users').insert({
            username,
            password: passwordHashed,
        })
    } catch (error) {
        throw new Error('Error in sign-up user')
    }
}

const login = async () => {
    try {
        const user = await knex("users").where({ username }).first();
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // hasing password and compare
        const hash = crypto.createHash('sha256');
        hash.update(password);
        const passwordHashed = hash.digest('hex');
        // compare body password with password saved in db
        if (user.password !== passwordHashed) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ permission: user.permission }, SECRET_KEY, { expiresIn: "1d", subject: user.id.toString() });
        res.cookie('token', token, { httpOnly: true });
        res.json({ message: "Login successfully" });
    } catch (error) {

    }
}

module.exports = {
    getAllUsers,
    register,
    login
};
