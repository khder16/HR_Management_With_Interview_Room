const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('khder16', 'root', '6195432', {
    host: 'localhost',
    dialect: 'mysql',

});


const Job = sequelize.define('job', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    },
    statuse: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    DNO: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ESSN: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    StartDate: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    EndDate: {
        type: DataTypes.DATE,
        defaultValue: null
    },
}, {
    tableName: 'job',
    timestamps: false
})

Job.sync().then((data) => {
    console.log("Table and moedl synced successfully");
}).catch((error) => {
    console.log(error);
})
module.exports = Job
