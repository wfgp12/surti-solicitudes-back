const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Permission = require('./permission');

const Rol = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true,
    tableName: 'roles'
});

module.exports = Rol;
