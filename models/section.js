
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Section = sequelize.define('section', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    identifier: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
}, {
    timestamps: true,
    tableName: 'sections'
});

module.exports = Section;
