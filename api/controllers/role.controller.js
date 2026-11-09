const roleService = require('../services/role.service');

const getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        res.status(200).send(roles);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = { getAllRoles };