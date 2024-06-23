const { errorResponse, successResponse } = require("../helpers/response-helper");
const { Section } = require("../models");


module.exports = {
    createSection: async (req, res) => {
        const { identifier, name, id_site } = req.body;
        try {
            const newSection = await Section.create({
                identifier,
                name,
                id_site
            });

            res.status(201).json(successResponse(newSection));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },

    getAllSections: async (req, res) => {
        try {
            const sections = await Section.findAll();
            res.status(200).json(successResponse(sections));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },

    getSectionById: async (req, res) => {
        try {
            const section = await Section.findByPk(req.params.id);
            if (!section) {
                return res.status(404).json(errorResponse('Sección no encontrada', 404));
            }
            res.status(200).json(successResponse(section));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },

    updateSection: async (req, res) => {
        const { id } = req.params;
        const { identifier, name, id_site } = req.body;
        try {

            const section = await Section.findByPk(id);
            if (!section) {
                return res.status(404).json(errorResponse('Sección no encontrada', 404));
            }

            await section.update({
                identifier,
                name,
                id_site
            });

            res.status(200).json(successResponse(section));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },

    deleteSection: async (req, res) => {
        const { id } = req.params;
        try {

            const section = await Section.findByPk(id);
            if (!section) {
                return res.status(404).json(errorResponse('Sección no encontrada', 404));
            }

            await section.destroy();

            res.status(200).json(successResponse('Sección eliminada correctamente'));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    }

}

