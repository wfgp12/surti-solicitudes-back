// validators/permissionValidator.js
const { body, param } = require('express-validator');

const { Permission } = require('../../models');
const { Op } = require('sequelize');


module.exports = {
    createPermission : [
        body('name').notEmpty().withMessage('Name is required').custom(async (value) => {
            const permission = await Permission.findOne({ where: { name: value } });
            if (permission) {
                return Promise.reject('Este permiso ya existe');
            }
        }).bail()
    ],
    
    getPermissionById : [
        param('id').isInt().withMessage('ID must be an integer').bail()
    ],
    
    updatePermission : [
        param('id').isInt().withMessage('ID must be an integer').bail(),
        body('name').optional().notEmpty().withMessage('Name is required').custom(async (value, { req }) => {
            const permission = await Permission.findOne({ where: { name: value, id: { [Op.ne]: req.params.id } } });
            if (permission) {
                return Promise.reject('Permission name already in use');
            }
        }).bail()
    ],
    
    deletePermission : [
        param('id').isInt().withMessage('ID must be an integer')
    ],
}
