// Libraries
const express = require('express');
const sectionRouter = express.Router();
// Controllers
const sectionController = require('../controllers/sectionControllers');
// Middlewares
const sectionValidator = require('../middlewares/validators/section-validator');
const { validateToken, validatePermission } = require('../middlewares/validators/auth-validator');
const { handleErrorsValidate } = require('../middlewares/handleError');

// Rutas para las secciones
sectionRouter.post('/', [
    validateToken,
    validatePermission('administrador'),
    sectionValidator.createSection,
    handleErrorsValidate
], sectionController.createSection);
sectionRouter.get('/', [
    validateToken,
    validatePermission('administrador'),
    handleErrorsValidate
], sectionController.getAllSections);
sectionRouter.get('/:id', [
    validateToken,
    validatePermission('administrador'),
    sectionValidator.getSectionById,
    handleErrorsValidate
], sectionController.getSectionById);
sectionRouter.put('/:id', [
    validateToken,
    validatePermission('administrador'),
    sectionValidator.updateSection,
    handleErrorsValidate
], sectionController.updateSection);
sectionRouter.delete('/:id', [
    validateToken,
    validatePermission('administrador'),
    sectionValidator.deleteSection,
    handleErrorsValidate
], sectionController.deleteSection);

module.exports = sectionRouter;
