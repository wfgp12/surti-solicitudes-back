
// Libraries
const express = require('express');
const tableConfigRouter = express.Router();
// Middlewares
const { handleErrorsValidate } = require('../middlewares/handleError');
const { validateToken, validatePermission } = require('../middlewares/validators/auth-validator');
// Controllers
const userController = require('../controllers/userController');
const tableConfigValidator = require('../middlewares/validators/table-config-validator');
const tableConfigController = require('../controllers/tableConfigController');

tableConfigRouter.post('/', [
    validateToken,
    validatePermission('administrador'),
    tableConfigValidator.createTableConfig,
    handleErrorsValidate
], tableConfigController.createTableConfig);


tableConfigRouter.get('/:tableName', [
    validateToken,
    // validatePermission('solicitante'),
    handleErrorsValidate
], tableConfigController.getTableConfig)

tableConfigRouter.get('/visibility/:tableName', [
    validateToken,
    validatePermission('administrador'),
    handleErrorsValidate
], tableConfigController.getTableConfigVisibility)

tableConfigRouter.put('/:tableName', [
    validateToken,
    validatePermission('administrador'),
    tableConfigValidator.updateTableConfig,
    handleErrorsValidate
], tableConfigController.updateTableConfig);

// tableConfigRouter.delete('/:id', [
//     validateToken,
//     validatePermission('administrador'),
//     handleErrorsValidate
// ], tableConfigController.deleteTableConfig);


module.exports = tableConfigRouter
