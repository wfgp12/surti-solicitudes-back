
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Request = sequelize.define('request', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    brand: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description:{
        type: DataTypes.STRING(150),
        allowNull: false
    },
    url_image: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
}, {
    timestamps: true,
    tableName: 'requests'
});

module.exports = Request;
