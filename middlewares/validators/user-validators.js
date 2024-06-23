// validators/userValidator.js
const { body, param } = require('express-validator');
const User = require('../../models/user');
const { Op, ValidationErrorItemOrigin } = require('sequelize');
const { Rol } = require('../../models');


module.exports = {
    createUser: [
        body('name').notEmpty().withMessage('Nombre es requerido').bail(),
        body('document').notEmpty().withMessage('Documento es requerido').custom(async (value) => {
            const user = await User.findOne({ where: { document: value } });
            if (user) {
                return Promise.reject('Document ya se encuentra en uso');
            }
        }).bail(),
        body('email').isEmail().withMessage('Email es invalido').custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) {
                return Promise.reject('E-mail ya se encuentra en uso');
            }
        }).bail(),
        body('id_role')
            .notEmpty().withMessage('El rol es requerido')
            .custom(async (value) => {
                const role = await Rol.findByPk(value);
                if (!role) {
                    return Promise.reject('Rol no existe');
                }
            }).bail(),
        body('password').notEmpty().withMessage('Password es requerida'),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }).bail()
    ],

    login: [
        body('document')
            .notEmpty().withMessage('Documento es requerido').bail()
            .isNumeric().withMessage('Documento debe contener solo números'),
        body('password').notEmpty().withMessage('Password es requerida').bail(),
    ],

    getUserById: [
        param('id').isInt().withMessage('ID must be an integer')
    ],

    updateUser: [
        param('id').isInt().withMessage('ID must be an integer'),
        body('name').optional().notEmpty().withMessage('Name is required'),
        body('document').optional().notEmpty().withMessage('Document is required').custom(async (value, { req }) => {
            const user = await User.findOne({ where: { document: value, id: { [Op.ne]: req.params.id } } });
            if (user) {
                return Promise.reject('Document already in use');
            }
        }),
        body('email').optional().isEmail().withMessage('Valid email is required').custom(async (value, { req }) => {
            const user = await User.findOne({ where: { email: value, id: { [Op.ne]: req.params.id } } });
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        }),
        body('id_role').optional()
            .notEmpty().withMessage('El rol es requerido')
            .custom(async (value) => {
                const role = await Rol.findByPk(value);
                if (!role) {
                    return Promise.reject('Rol no existe');
                }
            }).bail(),
        body('password').optional().notEmpty().withMessage('Password is required').custom(async (value, { req }) => {
            const user = await User.findByPk(req.params.id);
            if (user) {
                const isSamePassword = await compareEncryptedData(value, user.password);
                if (isSamePassword) {
                    return Promise.reject('New password cannot be the same as the old password');
                }
            }
        }),
    ],

    deleteUser: [
        param('id').isInt().withMessage('ID must be an integer')
    ],
}

