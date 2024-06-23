const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RolePermission = sequelize.define('RolePermission', {
    id_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    id_permission: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'permissions',
            key: 'id'
        }
    }
}, {
    tableName: 'role_permissions', 
    timestamps: false 
});

module.exports = RolePermission;
