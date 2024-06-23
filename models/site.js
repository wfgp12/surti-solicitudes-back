
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Site = sequelize.define('site', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'sites'
});


module.exports = Site;
