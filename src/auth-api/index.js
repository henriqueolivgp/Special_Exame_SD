const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const knexConfig = require('./knexfile').db;
const knex = require('knex')(knexConfig);

const app = express();


// configs

app.use(cors());
app.use(bodyParser.json());

app.use(router)

app.get('/', async (req, res) => {
    res.send('Welcome auth API')
})

// app.get("/users", async (req, res) => {
//     try {
//         const users = await knex.select("*").from("users");
//         res.json(users);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error retrieving data");
//     }
// });

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
