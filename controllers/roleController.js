const { Op } = require("sequelize");
const { successResponse, errorResponse } = require("../helpers/response-helper");
const Permission = require("../models/permission");
const Rol = require("../models/role");


module.exports = {
    getAllRoles: async (req, res) => {
        try {
            const roles = await Rol.findAll({
                include: {
                    model: Permission,
                    as: 'permissions',
                    through: {
                        attributes: []
                    },
                    attributes: ['id', 'name']
                },
                attributes: ['id', 'name']
            });
            res.json(successResponse(roles));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    getRoleById: async (req, res) => {
        try {
            const role = await Rol.findByPk(req.params.id, {
                include: {
                    model: Permission,
                    as: 'permissions',
                    through: {
                        attributes: []
                    },
                    attributes: ['id', 'name']
                },
                attributes: ['id', 'name']
            });
            if (role) {
                res.json(successResponse(role));
            } else {
                res.status(404).json(errorResponse('Rol no encontrado', 404));
            }
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    getRoleSelector: async (req, res) => {
        try {
            const role =  await Rol.findAll({
                // where: {name: { [Op.not]: 'administrador' } },
                attributes: ['id', 'name']
            });
            if (role) {
                res.json(successResponse(role));
            } else {
                res.status(404).json(errorResponse('Rol no encontrado', 404));
            }
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    createRole: async (req, res) => {
        const { name, permissions } = req.body;
        try {
            const newRole = await Rol.create({ name });
            await newRole.setPermissions(permissions)
            res.status(201).json(successResponse(newRole));

        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    updateRole: async (req, res) => {
        const { id } = req.params;
        const { name, permissions } = req.body;
        try {
            const role = await Rol.findByPk(id,);
            if (role) {
                const updatedRole = await role.update({name});
                if (permissions) {
                    await role.setPermissions(permissions);
                }
                res.json(successResponse(updatedRole));
            } else {
                res.status(404).json(errorResponse('Rol no encontrado', 404));
            }
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    deleteRole: async (req, res) => {
        try {
            const role = await Rol.findByPk(req.params.id);
            if (role) {
                await role.destroy();
                res.status(200).json(successResponse(true));
            } else {
                res.status(404).json(errorResponse('Rol no encontrado', 404));
            }
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
}
