const { Sequelize, DataTypes } = require('sequelize');




const sequelize = new Sequelize('khder16', 'root', '6195432', {
    host: 'localhost',
    dialect: 'mysql',
});



const Employee = sequelize.define('employee', {
    SSN: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    MartialStatus: {
        type: DataTypes.STRING(50),
        defaultValue: "Single"
    },
    city: {
        type: DataTypes.STRING(50),
        defaultValue: "Homs"
    },
    STnumber: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    DNO: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    Email: {
        type: DataTypes.STRING(100),
        defaultValue: null
    },
    BDate: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    Gender: {
        type: DataTypes.STRING(45),
        defaultValue: null
    }
}, {
    timestamps: false
})

Employee.sync().then((data) => {
    console.log("Table and moedl synced successfully");
}).catch((error) => {
    console.log(error);
})

module.exports = Employee