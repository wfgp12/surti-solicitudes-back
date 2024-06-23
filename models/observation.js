
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Observation = sequelize.define('status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
}, {
    timestamps: true,
    tableName: 'observations'
});

module.exports = Observation;
