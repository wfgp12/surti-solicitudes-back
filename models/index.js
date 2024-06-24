// Models
const Observation = require('./observation');
const Permission = require('./permission');
const Request = require('./request');
const RequestType = require('./type_request');
const Rol = require('./role');
const RolPermission = require('./role_permission');
const Section = require('./section');
const Site = require('./site');
const Status = require('./status');
const TableConfig = require('./tableConfig');
const User = require('./user');

// Relaciones User-Rol
User.belongsTo(Rol, { foreignKey: 'id_role', });
Rol.hasMany(User, { foreignKey: 'id_role', });

// Relaciones Rol-Permission
Rol.belongsToMany(Permission, { through: RolPermission, foreignKey: 'id_role', },);
Permission.belongsToMany(Rol, { through: RolPermission, foreignKey: 'id_permission', });

// Reslacion Sede-Seccion
Section.belongsTo(Site, { foreignKey: 'id_site' });
Site.hasMany(Section, { foreignKey: 'id_site' });

// Relaciones de Request con User
Request.belongsTo(User, { as: 'applicant', foreignKey: 'id_applicant' });
Request.belongsTo(User, { as: 'manager', foreignKey: 'id_manager' });
User.hasMany(Request, { foreignKey: 'id_applicant' });
User.hasMany(Request, { foreignKey: 'id_manager' });

// Relaciones de Observation con User y Request
Observation.belongsTo(User, { as: 'manager', foreignKey: 'id_manager' });
User.hasMany(Observation, { foreignKey: 'id_manager' });
Observation.belongsTo(Request, { foreignKey: 'id_request' });
Request.hasMany(Observation, { foreignKey: 'id_request' });

// Relaciones de Request con Site, Section, Status, Type
Request.belongsTo(Site, { foreignKey: 'id_site' });
Site.hasMany(Request, { foreignKey: 'id_site' });

Request.belongsTo(Section, { foreignKey: 'id_section' });
Section.hasMany(Request, { foreignKey: 'id_section' });

Request.belongsTo(Status, { foreignKey: 'id_status' });
Status.hasMany(Request, { foreignKey: 'id_status' });

Request.belongsTo(RequestType, { foreignKey: 'id_type' });
RequestType.hasMany(Request, { foreignKey: 'id_type' });

module.exports = {
    Observation,
    Permission,
    Request,
    RequestType,
    Rol,
    RolPermission,
    Section,
    Site,
    Status,
    TableConfig,
    User,
};
