const express = require('express');
const {users, register, login} = require('./controllers');
const tableUsers = require('./models');
const app = express();


app.use(express.json());

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('/', users);    
app.post('/register', register);
app.post('/login', login);

app.listen(3000, () => {console.log('Corriendo en el puerto: 3000')});