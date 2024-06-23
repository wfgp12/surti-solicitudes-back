// controllers/sedeController.js
const { successResponse, errorResponse } = require('../helpers/response-helper');
const { Site, Section } = require('../models');

module.exports = {
    createSite: async (req, res) => {
        const { name } = req.body;
        try {
            const newSite = await Site.create({ name });
            res.status(201).json(successResponse(newSite));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    getAllSites: async (req, res) => {
        try {
            const sites = await Site.findAll({
                include: {
                    model: Section,
                    attributes: ['id', 'identifier', 'name']
                }
            });
            res.status(200).json(successResponse(sites));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    getSiteById: async (req, res) => {
        const { id } = req.params;
        try {
            const site = await Site.findByPk(id, {
                include: {
                    model: Section,
                    attributes: ['id', 'identifier', 'name']
                }
            });
            if (!site) {
                return res.status(404).json(errorResponse('Sede no encontrada', 404 ));
            }
            res.status(200).json(successResponse(site));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    updateSite: async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        try {
            let site = await Site.findByPk(id);
            if (!site) {
                return res.status(404).json(errorResponse('Sede no encontrada', 404 ));
            }
            site.name = name;
            await site.save();
            res.status(200).json(successResponse(site));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    deleteSite: async (req, res) => {
        const { id } = req.params;
        try {
            const site = await Site.findByPk(id);
            if (!site) {
                return res.status(404).json(errorResponse('Sede no encontrada', 404));
            }
            await site.destroy();
            res.status(204).json();
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    }
};
