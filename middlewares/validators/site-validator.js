// validators/permissionValidator.js
const { body, param } = require('express-validator');

const { Site } = require('../../models');
const { Op } = require('sequelize');


module.exports = {
    createSection : [
        body('name').notEmpty().withMessage('Name is required').custom(async (value) => {
            const section = await Site.findOne({ where: { name: value } });
            if (section) {
                return Promise.reject('Esta sede ya existe');
            }
        }).bail()
    ],
    
    getSectionById : [
        param('id').isInt().withMessage('ID must be an integer').bail()
    ],
    
    updateSection : [
        param('id').isInt().withMessage('ID must be an integer').bail(),
        body('name').optional().notEmpty().withMessage('Name is required').custom(async (value) => {
            const section = await Site.findOne({ where: { name: value } });
            if (section) {
                return Promise.reject('Esta sede ya existe');
            }
        }).bail()
    ],
    
    deleteSection : [
        param('id').isInt().withMessage('ID must be an integer')
    ],
}
