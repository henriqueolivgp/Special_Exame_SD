const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/user.routes');
// const knexConfig = require('./knexfile').db;
// const knex = require('knex')(knexConfig);
const cookieParser = require('cookie-parser')
const verifyAuth = require('./middleware/verifyAuth');
const { authRoutes } = require('./routes/auth.routes');

const app = express();


// configs

app.use(bodyParser.json());
app.use(cors({
    origin: '*', // Substitua pelo domínio da sua API Nest
    credentials: true
  }));
app.use(cookieParser());

app.use(authRoutes)

app.use(verifyAuth);
app.use(router)

app.get('/', async (req, res) => {
    res.send('Welcome auth API')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
