const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('khder16', 'root', '6195432', {
    host: 'localhost',
    dialect: 'mysql',

});

const EmpFinancials = sequelize.define('empfinancials', {
    ESSN: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    BasicSalary: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    HouseAllowance: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    MedicalAllowance: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    OtherAllowance: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    TaxDeduction: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    OtherDeduction: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
});


EmpFinancials.sync().then((data) => {
    console.log("Table and moedl synced successfully");
}).catch((error) => {
    console.log(error);
})
module.exports = EmpFinancials
