// validators/permissionValidator.js
const { body, param } = require('express-validator');

const { Permission, Section, Site } = require('../../models');
const { Op } = require('sequelize');


module.exports = {
    createSection : [
        body('identifier').notEmpty().withMessage('Identifier is required').custom(async (value) => {
            const section = await Section.findOne({ where: { identifier: value } });
            if (section) {
                return Promise.reject('Esta sección ya existe');
            }
        }).bail(),
        body('name').notEmpty().withMessage('Name is required').custom(async (value) => {
            const section = await Section.findOne({ where: { name: value } });
            if (section) {
                return Promise.reject('Esta sección ya existe');
            }
        }).bail(),
        body('id_site').notEmpty().withMessage('sede es requerida').custom(async (value) => {
            const section = await Site.findByPk(value);
            if (!section) {
                return Promise.reject('sede no valida');
            }
        }).bail(),
    ],
    
    getSectionById : [
        param('id').isInt().withMessage('ID must be an integer').bail()
    ],
    
    updateSection : [
        param('id').isInt().withMessage('ID must be an integer').bail(),
        body('identifier').optional().notEmpty().withMessage('Identifier is required').custom(async (value) => {
            const section = await Section.findOne({ where: { identifier: value } });
            if (section) {
                return Promise.reject('Esta sección ya existe');
            }
        }).bail(),
        body('name').optional().notEmpty().withMessage('Name is required').custom(async (value) => {
            const section = await Section.findOne({ where: { name: value } });
            if (section) {
                return Promise.reject('Esta sección ya existe');
            }
        }).bail(),
        body('id_site').optional().notEmpty().withMessage('sede es requerida').custom(async (value) => {
            const section = await Site.findByPk(value);
            if (!section) {
                return Promise.reject('sede no valida');
            }
        }).bail(),
    ],
    
    deleteSection : [
        param('id').isInt().withMessage('ID must be an integer')
    ],
}
