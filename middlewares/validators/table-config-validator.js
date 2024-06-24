// validators/userValidator.js
const { body, param } = require('express-validator');
const User = require('../../models/user');
const { TableConfig } = require('../../models');


module.exports = {
    createTableConfig: [
        body('name')
            .notEmpty().withMessage('Table name is required').bail()
            .isString().withMessage('Table name must be a string').bail(),
        body('fields')
            .isArray({ min: 1 }).withMessage('Fields must be a non-empty array').bail(),
        body('fields.*')
            .notEmpty().withMessage('Field name is required').bail()
            .isString().withMessage('Field name must be a string').bail(),
        body('fields').custom(async (fields, { req }) => {
            for (const field of fields) {
                const existingConfig = await TableConfig.findOne({
                    where: {
                        tableName: req.body.name,
                        columnName: field
                    }
                });
                if (existingConfig) {
                    throw new Error(`The combination of table name "${req.body.tableName}" and column name "${field}" already exists`);
                }
            }
            return true;
        })
    ],

    updateTableConfig: [
        body('columns')
            .isArray({ min: 1 }).withMessage('Columns must be a non-empty array').bail(),
        body('columns.*.name')
            .notEmpty().withMessage('Column name is required').bail()
            .isString().withMessage('Column name must be a string').bail()
            .custom(async (value, { req }) => {
                const fieldExists = await TableConfig.findOne({
                    where: {
                        tableName: req.params.tableName,
                        columnName: value
                    }
                });
                if (!fieldExists) {
                    throw new Error(`Field name "${value}" does not exist in table "${req.params.tableName}"`);
                }
                return true;
            }).bail(),
        body('columns.*.isVisible').optional().isBoolean().withMessage('Visibility must be a boolean value'),
        body('columns.*.order').optional().isInt({ min: 1 }).withMessage('Order must be an integer greater than 0'),
    ],

    deleteUser: [],
}

