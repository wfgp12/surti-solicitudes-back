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
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{
    indexes: [
        {
            unique: true,
            fields: ['tableName', 'columnName']
        }
    ]
});

module.exports = TableConfig;
