const { Rol, Permission, User, RolPermission } = require('../models'); // Ajusta la ruta según tu estructura de archivos
const { encryptData } = require('./crypto-helper');

async function initializeDatabase() {
    try {
        const roles = ['administrador'];
        await Promise.all(roles.map(async (roleName) => {
            const existingRole = await Rol.findOne({ where: { name: roleName } });
            if (!existingRole) {
                await Rol.create({ name: roleName });
                console.log(`Rol '${roleName}' creado.`);
            }
        }));

        const permissions = ['solicitante', 'gestionador', 'monitor', 'administrador'];
        await Promise.all(permissions.map(async (permName) => {
            const existingPermission = await Permission.findOne({ where: { name: permName } });
            if (!existingPermission) {
                await Permission.create({ name: permName });
                console.log(`Permiso '${permName}' creado.`);
            }
        }));

        
        const adminRole = await Rol.findOne({ where: { name: 'administrador' } });
        const adminPermissions = await Permission.findAll();

        const adminUser = await User.findOne({ where: { email: 'admin@example.com' } }); 

        if (!adminUser) {
            const newUser = await User.create({
                name: 'Administrador',
                document: '123456789',
                email: 'admin@example.com',
                password: await encryptData('adminpassword'), 
                id_role: adminRole.id
            });

            await Promise.all(adminPermissions.map(async (permission) => {
                await RolPermission.findOrCreate({
                    where: {
                        id_role: adminRole.id,
                        id_permission: permission.id
                    }
                });
            }));

            console.log('Usuario administrador creado con todos los permisos.');
        } else {
            console.log('El usuario administrador ya existe.');
        }

        console.log('Inicialización de la base de datos completada.');
    } catch (error) {
        console.error('Error en la inicialización de la base de datos:', error);
    }
}

module.exports = initializeDatabase;
