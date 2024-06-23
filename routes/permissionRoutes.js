const express = require('express');
const permissionValidator = require('../middlewares/validators/permission-validator');
const permissionController = require('../controllers/permissionController');
const { handleErrorsValidate } = require('../middlewares/handleError');
const { validateToken } = require('../middlewares/validators/auth-validator');

const permissionRoutes = express.Router();

permissionRoutes.post('/', [
    validateToken,
    permissionValidator.createPermission,
    handleErrorsValidate
], permissionController.createPermission);

permissionRoutes.get('/', [
    validateToken,
    handleErrorsValidate
], permissionController.getAllPermissions);

permissionRoutes.get('/:id', [
    validateToken,
    permissionValidator.getPermissionById,
    handleErrorsValidate
], permissionController.getPermissionById);

permissionRoutes.put('/:id', [
    validateToken,
    permissionValidator.updatePermission,
    handleErrorsValidate
], permissionController.updatePermission);

permissionRoutes.delete('/:id',[
    validateToken, 
    permissionValidator.deletePermission,
    handleErrorsValidate
], permissionController.deletePermission);

module.exports = permissionRoutes;
