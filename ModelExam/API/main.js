const express = require('express');
const {validateUser} = require('./middlewares');
const {users, register, login, userLoged} = require('./controllers');
const tableUsers = require('./models');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.URL_CLIENT);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('/', users);    
app.post('/register', register);
app.post('/login', login);
app.get('/dashboard', validateUser, userLoged)

tableUsers.sync({force:true});
app.listen(process.env.PORT, () => {console.log('Servidor iniciado en el puerto correspondiente')});
