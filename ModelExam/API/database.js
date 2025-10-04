const { Sequelize } = require('sequelize');

const db = new Sequelize('prueba', 'postgres', '1234', {
    dialect: 'postgres',
    host:'localhost',
    logging: false
});

module.exports = db;