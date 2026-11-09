const roleSchema = require('../schemas/role.schema');

const findRoleByName = async (name) => {
    try {
        const resp = await roleSchema.findOne({ where: { name: name } });
        return resp;
    } catch (error) {
        return error;
    }
}

const getAllRoles = async () => {
    try {
        const roles = await roleSchema.findAll();
        return roles;
    } catch (error) {
        return error;
    }
}

module.exports = { findRoleByName, getAllRoles };