const { body, param } = require('express-validator');
const Rol = require('../../models/role');
const { Op } = require('sequelize');
const { Permission } = require('../../models');

module.exports = {
    createRole: [
        body('name').notEmpty().withMessage('Name is required').custom(async (value) => {
            const role = await Rol.findOne({ where: { name: value } });
            if (role) {
                return Promise.reject('Role name already in use');
            }
        }),
        body('permissions')
            .isArray().withMessage('Permissions must be an array').bail()
            .notEmpty().withMessage('Permissions are required').bail()
            .custom(async (permissions) => {
                const existingPermissions = await Permission.findAll({
                    where: { id: permissions }
                });
                const existingPermissionIds = existingPermissions.map(p => p.id);
                const invalidPermissions = permissions.filter(p => !existingPermissionIds.includes(p));
                if (invalidPermissions.length > 0) {
                    throw new Error(`Invalid permission IDs: ${invalidPermissions.join(', ')}`);
                }
            }).bail()
    ],

    getRoleById: [
        param('id').isInt().withMessage('ID must be an integer')
    ],

    updateRole: [
        param('id').isInt().withMessage('ID must be an integer'),
        body('name').optional()
            .notEmpty().withMessage('Name is required').bail()
            .custom(async (value, { req }) => {
                const role = await Rol.findOne({ where: { name: value, id: { [Op.ne]: req.params.id } } });
                if (role) {
                    return Promise.reject('Role name already in use');
                }
            }).bail(),
        body('permissions').optional()
            .isArray().withMessage('Permissions must be an array').bail()
            .custom(async (permissions) => {
                const existingPermissions = await Permission.findAll({
                    where: { id: permissions }
                });
                const existingPermissionIds = existingPermissions.map(p => p.id);
                const invalidPermissions = permissions.filter(p => !existingPermissionIds.includes(p));
                if (invalidPermissions.length > 0) {
                    throw new Error(`Invalid permission IDs: ${invalidPermissions.join(', ')}`);
                }
            }).bail()
    ],

    deleteRole: [
        param('id').isInt().withMessage('ID must be an integer')
    ]
}
