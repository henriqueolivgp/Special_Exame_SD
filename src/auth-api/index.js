const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const knexConfig = require('./knexfile').db;
const knex = require('knex')(knexConfig);
const cookieParser = require('cookie-parser')

const app = express();


// configs

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(router)

app.get('/', async (req, res) => {
    res.send('Welcome auth API')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
