const { successResponse, errorResponse } = require("../helpers/response-helper");
const { Permission } = require("../models");


module.exports = {
    getAllPermissions: async (req, res) => {
        try {
            const permissions = await Permission.findAll();
            res.json(successResponse(permissions));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },

    getPermissionById: async (req, res) => {
        try {
            const permission = await Permission.findByPk(req.params.id);
            if (permission) {
                res.json(successResponse(permission));
            } else {
                res.status(404).json(errorResponse('Permiso no encontrado', 404));
            }
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },

    createPermission: async (req, res) => {
        try {
            const { name } = req.body;
            const newPermission = await Permission.create({ name });
            res.status(201).json(successResponse(newPermission));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },

    updatePermission: async (req, res) => {
        try {
            const permission = await Permission.findByPk(req.params.id);
            const { name } = req.body;
            if (permission) {
                const updatedPermission = await permission.update({name});
                res.json(successResponse(updatedPermission));
            } else {
                res.status(404).json(errorResponse('Permiso no encontrado', 404));
            }
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },

    deletePermission: async (req, res) => {
        try {
            const permission = await Permission.findByPk(req.params.id);
            if (permission) {
                await permission.destroy();
                res.status(204).send();
            } else {
                res.status(404).json(errorResponse('Permiso no encontrado', 404));
            }
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    }
}