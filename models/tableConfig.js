// models/columnConfig.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TableConfig = sequelize.define('table_config', {
    tableName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    columnName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = TableConfig;
