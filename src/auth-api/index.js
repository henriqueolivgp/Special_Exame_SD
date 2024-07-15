const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userController = require('./controllers/user.controller');
const knexConfig = require('./knexfile').db;

const app = express();


// configs

app.use(cors());
app.use(bodyParser.json());

// routes
app.use(userController)

app.get('/', async (req, res) => {
    res.send('Welcome auth API')
})

// app.get('/teachers', async (req, res) => {
//     try {
//         const teachers = await knex.select('*').from('teachers');
//         res.json(teachers);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error retrieving data');
//     }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
