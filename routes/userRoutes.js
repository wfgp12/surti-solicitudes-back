
// Libraries
const express = require('express');
const userRouter = express.Router();
// Middlewares
const { handleErrorsValidate } = require('../middlewares/handleError');
const userValidators = require('../middlewares/validators/user-validators');
const { validateToken, validatePermission } = require('../middlewares/validators/auth-validator');
// Controllers
const userController = require('../controllers/userController');

userRouter.post('/login', [
    userValidators.login,
    handleErrorsValidate
], userController.login);

userRouter.post('/validate-session', [
    validateToken,
    handleErrorsValidate
], userController.validateSession);

userRouter.post('/', [
    validateToken,
    validatePermission('administrador'),
    userValidators.createUser,
    handleErrorsValidate
], userController.createUser);


userRouter.get('/', [
    validateToken,
    validatePermission('administrador'),
    handleErrorsValidate
], userController.finAllUSer)

userRouter.get('/:id', [
    validateToken,
    validatePermission('administrador'),
    userValidators.getUserById,
    handleErrorsValidate
], userController.findUserByID);

userRouter.put('/:id', [
    validateToken,
    validatePermission('administrador'),
    userValidators.updateUser,
    handleErrorsValidate
], userController.updateUser);


userRouter.delete('/:id', [
    validateToken,
    validatePermission('administrador'),
    handleErrorsValidate
], userController.deleteUser);


module.exports = userRouter
