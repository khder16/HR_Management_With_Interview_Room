const { Sequelize, DataTypes } = require('sequelize');




const sequelize = new Sequelize('khder16', 'root', '6195432', {
    host: 'localhost',
    dialect: 'mysql'
});


const Department = sequelize.define('department', {
    Number: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    NumOfEmp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    MGR_SSN: {
        type: DataTypes.INTEGER,
        defaultValue: null
    }
}, {
    timestamps: false
})




Department.sync().then((data) => {
    console.log("Table and moedl synced successfully");
}).catch((error) => {
    console.log(error);
})
module.exports = Department