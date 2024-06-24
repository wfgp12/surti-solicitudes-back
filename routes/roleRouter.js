// routes/roleRoutes.js
const express = require('express');
const roleController = require('../controllers/roleController');
const roleValidator = require('../middlewares/validators/role-validator');
const { handleErrorsValidate } = require('../middlewares/handleError');
const { validateToken, validatePermission } = require('../middlewares/validators/auth-validator');

const roleRouter = express.Router();

roleRouter.post('/', [
    validateToken,
    validatePermission('administrador'),
    roleValidator.createRole, 
    handleErrorsValidate
], roleController.createRole);
roleRouter.get('/selector', [
    validateToken,
    validatePermission('administrador'), 
    handleErrorsValidate
], roleController.getRoleSelector);
roleRouter.get('/', [
    validateToken,
    validatePermission('administrador'),
    handleErrorsValidate
],roleController.getAllRoles);
roleRouter.get('/:id', [
    validateToken,
    validatePermission('administrador'),
    roleValidator.getRoleById, 
    handleErrorsValidate
], roleController.getRoleById);
roleRouter.put('/:id', [
    validateToken,
    validatePermission('administrador'),
    roleValidator.updateRole,
    handleErrorsValidate
], roleController.updateRole);
roleRouter.delete('/:id', [
    validateToken,
    validatePermission('administrador'),
    roleValidator.deleteRole, 
    handleErrorsValidate
], roleController.deleteRole);

module.exports = roleRouter;
