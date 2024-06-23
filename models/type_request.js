
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RequestType = sequelize.define('request_type', {
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
    tableName: 'request_types'
});

module.exports = RequestType;
