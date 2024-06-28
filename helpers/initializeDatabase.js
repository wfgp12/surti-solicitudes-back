const { Rol, Permission, User, RolPermission, TableConfig } = require('../models'); // Ajusta la ruta según tu estructura de archivos
const { encryptData } = require('./crypto-helper');

const rolePermissionMapping = {
    'solicitante': ['asesora comercial', 'líder de sección', 'impulsadora', 'supervisor', 'administración', 'director comercial', 'asesor complementario', 'coordinador de bodega'],
    'monitor': ['administración', 'director comercial'],
    'gestionador': ['coordinador de compras']
};

const tableConfigurations = [
    // Configuraciones para la tabla 'solicitudes'
    { tableName: 'solicitudes', columnName: 'Fecha de solicitud', isVisible: true, order: 1 },
    { tableName: 'solicitudes', columnName: 'Tipo de solicitud', isVisible: true, order: 2 },
    { tableName: 'solicitudes', columnName: 'Estado', isVisible: true, order: 3 },
    { tableName: 'solicitudes', columnName: 'Marca', isVisible: true, order: 4 },
    { tableName: 'solicitudes', columnName: 'Archivo adjunto', isVisible: true, order: 5 },
    { tableName: 'solicitudes', columnName: 'Descripcion', isVisible: true, order: 6 },
    { tableName: 'solicitudes', columnName: 'Fecha de respuesta', isVisible: true, order: 7 },
    { tableName: 'solicitudes', columnName: 'Revisado por', isVisible: true, order: 8 },

    // Configuraciones para la tabla 'solicitudes_pendientes'
    { tableName: 'solicitudes_pendientes', columnName: 'Fecha de solicitud', isVisible: true, order: 1 },
    { tableName: 'solicitudes_pendientes', columnName: 'Nombre solicitante', isVisible: true, order: 2 },
    { tableName: 'solicitudes_pendientes', columnName: 'Cargo', isVisible: true, order: 3 },
    { tableName: 'solicitudes_pendientes', columnName: 'Tipo de solicitud', isVisible: true, order: 4 },
    { tableName: 'solicitudes_pendientes', columnName: 'Marca', isVisible: true, order: 5 },
    { tableName: 'solicitudes_pendientes', columnName: 'Archivo adjunto', isVisible: true, order: 6 },
    { tableName: 'solicitudes_pendientes', columnName: 'Descripcion', isVisible: true, order: 7 },
    { tableName: 'solicitudes_pendientes', columnName: 'Estado', isVisible: true, order: 8 },

    // Configuraciones para la tabla 'solicitudes_gestionadas'
    { tableName: 'solicitudes_gestionadas', columnName: 'Fecha de solicitud', isVisible: true, order: 1 },
    { tableName: 'solicitudes_gestionadas', columnName: 'Nombre solicitante', isVisible: true, order: 2 },
    { tableName: 'solicitudes_gestionadas', columnName: 'Cargo', isVisible: true, order: 3 },
    { tableName: 'solicitudes_gestionadas', columnName: 'Tipo de solicitud', isVisible: true, order: 4 },
    { tableName: 'solicitudes_gestionadas', columnName: 'Marca', isVisible: true, order: 5 },
    { tableName: 'solicitudes_gestionadas', columnName: 'Archivo adjunto', isVisible: true, order: 6 },
    { tableName: 'solicitudes_gestionadas', columnName: 'Descripcion', isVisible: true, order: 7 },
    { tableName: 'solicitudes_gestionadas', columnName: 'Estado', isVisible: true, order: 8 },
    { tableName: 'solicitudes_gestionadas', columnName: 'Tiempo de respuesta', isVisible: true, order: 9 },

    // Configuraciones para la tabla 'usuarios'
    { tableName: 'usuarios', columnName: 'Nombre', isVisible: true, order: 1 },
    { tableName: 'usuarios', columnName: 'Rol', isVisible: true, order: 2 },
    { tableName: 'usuarios', columnName: 'Documento', isVisible: true, order: 3 },
    { tableName: 'usuarios', columnName: 'Contraseña', isVisible: true, order: 4 },

    // Configuraciones para la tabla 'sedes'
    { tableName: 'sedes', columnName: 'ID', isVisible: true, order: 1 },
    { tableName: 'sedes', columnName: 'Nombre', isVisible: true, order: 2 },

    // Configuraciones para la tabla 'roles'
    { tableName: 'roles', columnName: 'ID', isVisible: true, order: 1 },
    { tableName: 'roles', columnName: 'Nombre', isVisible: true, order: 2 },
];


async function initializeDatabase() {
    try {
        const [permission, createdPermission] = await Permission.findOrCreate({ where: { name: 'administrador' } });
        if (createdPermission) {
            console.log(`Permiso '${permission.name}' creado.`);
        }
        // Crear roles y permisos, y asignar roles a permisos
        for (const [permName, roleNames] of Object.entries(rolePermissionMapping)) {
            const [permission, createdPermission] = await Permission.findOrCreate({ where: { name: permName } });
            if (createdPermission) {
                console.log(`Permiso '${permName}' creado.`);
            }
            await Promise.all(roleNames.map(async (roleName) => {
                const [role, createdRole] = await Rol.findOrCreate({ where: { name: roleName } });
                if (createdRole) {
                    console.log(`Rol '${roleName}' creado.`);
                }
                const [rolePermission, assigned] = await RolPermission.findOrCreate({
                    where: {
                        id_role: role.id,
                        id_permission: permission.id
                    }
                });
                if (assigned) {
                    console.log(`Asignado permiso '${permName}' al rol '${roleName}'.`);
                }
            }));
        }

        // Crear usuario administrador con todos los permisos
        const [adminRole, adminRoleCreated] = await Rol.findOrCreate({ where: { name: 'super_administrador' } });
        if (adminRoleCreated) {
            console.log('Rol super_administrador creado.');
        }
        const adminPermissions = await Permission.findAll();
        await Promise.all(adminPermissions.map(async (permission) => {
            const [_rolePermission, assigned] = await RolPermission.findOrCreate({
                where: {
                    id_role: adminRole.id,
                    id_permission: permission.id
                }
            });
            if (assigned) {
                console.log(`Asignado permiso '${permission.name}' al rol 'administrador'.`);
            }
        }));
        const [_adminUser, adminCreated] = await User.findOrCreate({
            where: { email: 'w.gutierrez1206@gmail.com' },
            defaults: {
                name: 'Wilhen Ferney Gutiérrez Pabón',
                document: '1193288582',
                password: await encryptData('WfGp150620'),
                id_role: adminRole.id
            }
        });

        if (adminCreated) {
            console.log('Usuario administrador creado con todos los permisos.');
        }

        await Promise.all(tableConfigurations.map(async (config) => {
            await TableConfig.findOrCreate({ where: { tableName: config.tableName, columnName: config.columnName }, defaults: config });
        }));

        console.log('Inicialización de la base de datos completada.');
    } catch (error) {
        console.error('Error en la inicialización de la base de datos:', error);
    }
}

module.exports = initializeDatabase;
