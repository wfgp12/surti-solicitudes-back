
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Status = sequelize.define('status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
}, {
    timestamps: true,
    tableName: 'states'
});

module.exports = Status;
