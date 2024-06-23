// Libraries
const express = require('express');
const siteControllers = require('../controllers/siteControllers');
const { validateToken, validatePermission } = require('../middlewares/validators/auth-validator');
const { handleErrorsValidate } = require('../middlewares/handleError');
const siteValidator = require('../middlewares/validators/site-validator');
const siteRouter = express.Router();

// Rutas para secciones
siteRouter.post('/', [
    validateToken,
    validatePermission('administrador'),
    siteValidator.createSection,
    handleErrorsValidate
], siteControllers.createSite);
siteRouter.get('/', [
    validateToken,
    validatePermission('administrador'),
    handleErrorsValidate
], siteControllers.getAllSites);
siteRouter.get('/:id', [
    validateToken,
    validatePermission('administrador'),
    siteValidator.getSectionById,
    handleErrorsValidate
], siteControllers.getSiteById);
siteRouter.put('/:id', [
    validateToken,
    validatePermission('administrador'),
    siteValidator.updateSection,
    handleErrorsValidate
], siteControllers.updateSite);
siteRouter.delete('/:id',[
    validateToken,
    validatePermission('administrador'),
    siteValidator.deleteSection,
    handleErrorsValidate
], siteControllers.deleteSite);

module.exports = siteRouter;
