const Sequelize = require('sequelize')
const User = require('../model/user')
const Admin = require('../model/admin')
const Employee = require('../model/employee')
const Department = require('../model/departmen')
const EmpFinancials = require('../model/empfinancials')
const Job = require('../model/job')

const sequelize = new Sequelize('khder16', 'root', '6195432', {
    host: 'localhost',
    dialect: 'mysql',
    schema: 'Kh16'
});


// sequelize.query('CREATE DATABASE IF NOT EXISTS khder16')
//     .then(() => {
//         console.log('Database created successfully.');
//     })
//     .catch((error) => {
//         console.error('Unable to create the database:', error);
//     });



sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });


module.exports = sequelize
global.sequelize = sequelize