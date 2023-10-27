const { Sequelize, DataTypes } = require('sequelize');




const sequelize = new Sequelize('khder16', 'root', '6195432', {
    host: 'localhost',
    dialect: 'mysql'
});

const Admin = sequelize.define('admin', {
    adminUserName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: { type: DataTypes.STRING },
})

Admin.sync().then((data) => {
    console.log("Table and moedl synced successfully");
}).catch((error) => {
    console.log(error);
})
module.exports = Admin