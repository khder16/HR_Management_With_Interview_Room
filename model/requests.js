const { Sequelize, DataTypes } = require('sequelize');




const sequelize = new Sequelize('khder16', 'root', '6195432', {
    host: 'localhost',
    dialect: 'mysql'
});




const Requests = sequelize.define('requests', {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ESSN: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
})









Requests.sync().then((data) => {
    console.log("Table and moedl synced successfully");
}).catch((error) => {
    console.log(error);
})
module.exports = Requests
