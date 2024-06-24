
const { header, check } = require("express-validator");
const { verifyToken } = require("../../helpers/auth-helper");
const User = require("../../models/user");
const { Permission, Rol } = require("../../models");

const validateToken = [
    header('Authorization')
        .exists().withMessage('Token de sesión requerido en los headers').bail()
        .custom(async (value, { req }) => {
            
            const token = value.split(' ')[1];
            const decodedToken = verifyToken(token);
            
            if (!decodedToken)  throw new Error('Token de sesión expiro');
            try {
                const userId = parseInt(decodedToken.userId, 10);
                if (isNaN(userId)) {
                    throw new Error('ID must be an integer');
                }

                req.body.user = await User.findOne({
                    where: { id: userId },
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
                    attributes: { exclude: ['password', 'id_role', 'updatedAt', 'createdAt'] }
                });

                return true;
            } catch (error) {
                throw new Error('Token de sesión inválido');
            }
        }).bail()
]

const validatePermission = (permission) => [
    check('user')
        .exists().withMessage('usuario no autorizado').bail()
        .custom(async (user, {req}) => {
            try {
                const permissions = await Permission.findAll({
                    include: [
                        {
                            model: Rol,
                            where: { id: user.role.id },
                            attributes: [] 
                        }
                    ],
                    attributes: ['name'] ,
                    raw: true
                });
                const permissionNames = permissions.map(permission => permission.name);
                if (!permissionNames?.length || !permissionNames.includes(permission || req.body.permission)) {
                    throw new Error('No tienes permisos para realizar esta acción');
                }
                return false;
            } catch (error) {
                throw new Error(error.message);
            }
        }
        ).bail()
];

module.exports = {
    validateToken,
    validatePermission
}
