// Imports
const express = require('express');

const router = express.Router();

const User = require('../services/user.service');

router.get('/users', async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// const getUserById = async (req, res) => {
//     try {
//         const user = await userService.getUserById(req.params.id);
//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).send('User not found');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error retrieving user');
//     }
// };

// Add more controllers as needed

module.exports = router;
