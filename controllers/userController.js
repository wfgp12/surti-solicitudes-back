const { generateToken } = require("../helpers/auth-helper");
const { encryptData, compareEncryptedData } = require("../helpers/crypto-helper");
const { successResponse, errorResponse } = require("../helpers/response-helper");
const { Rol, Permission } = require("../models");
const User = require("../models/user");

module.exports = {
    createUser: async (req, res) => {
        try {
            const { name, document, email, id_role, password } = req.body;
            const encryptPassword = await encryptData(password);

            const user = await User.create({
                name,
                document,
                email,
                id_role,
                password: encryptPassword
            })
            res.status(201).json(successResponse(user));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    login: async (req, res) => {
        try {
            const { document, password } = req.body;
            const user = await User.findOne({
                where: { document },
                include: {
                    model: Rol,
                    attributes: ['id', 'name'], 
                    include: {
                        model: Permission,
                        attributes: ['id', 'name'],
                        through: {
                            attributes: [] 
                        }
                    }
                },
                attributes: { exclude: ['createdAt', 'updatedAt', 'id_role'] }
            });

            if (!user) return res.status(404).json(errorResponse('Usuario no encontrado', 404));
            const { password: userPsw, ...userWithoutPsw } = user.toJSON();

            const isCorrectPassword = await compareEncryptedData(password, userPsw);
            if (!isCorrectPassword) return res.status(401).json(errorResponse('Contraseña incorrecta', 401));

            const token = generateToken({ userId: userWithoutPsw.id });

            res.status(201).json(successResponse({ user: userWithoutPsw, token }));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    finAllUSer: async (req, res) => {
        try {
            const users = await User.findAll({
                include: {
                    model: Rol,
                    attributes: ['id', 'name']
                },
                attributes: { exclude: ['password', 'id_role', 'updatedAt', 'createdAt'] }
            });

            res.status(201).json(successResponse(users));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    findUserByID: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findOne({
                where: { id },
                include: {
                    model: Rol,
                    attributes: ['id', 'name']
                },
                attributes: { exclude: ['password', 'id_role', 'updatedAt', 'createdAt'] }
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(201).json(successResponse(user));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, document, email, id_role } = req.body;

            const [updatedCount] = await User.update({ name, document, email, id_role }, { where:{id} });

            if (updatedCount === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            const updatedUser = await User.findOne({
                where: { id },
                include: {
                    model: Rol,
                    attributes: ['id', 'name']
                },
                attributes: { exclude: ['password', 'id_role', 'updatedAt', 'createdAt'] }
            });
            res.status(201).json(successResponse(updatedUser));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedCount = User.destroy({ where: { id } });
            if (deletedCount === 0) {
                return res.status(404).json(errorResponse('User not found', 404));
            }

            res.status(200).json(successResponse(true));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    },
    validateSession: (req, res) => {
        try {
            const {user} = req.body
            res.status(201).json(successResponse(user));
        } catch (error) {
            res.status(500).json(errorResponse(error.message, 500));
        }
    }
}