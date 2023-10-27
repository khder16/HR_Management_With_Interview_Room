const { Sequelize, DataTypes } = require('sequelize');




const sequelize = new Sequelize('khder16', 'root', '6195432', {
    host: 'localhost',
    dialect: 'mysql',
});

    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        }
    })

User.sync().then((data) => {
    console.log("Table and moedl synced successfully");
}).catch((error) => {
    console.log(error);
})
module.exports = User