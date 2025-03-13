const userSchema = require('../schemas/user.schema');
const roleSchema = require('../schemas/role.schema');
const user_roleSchema = require('../schemas/user_role.schema');
const roleService = require('./role.service');
const db= require('../configs/db.config');

const getAllusers = async () => {
    const users = await userSchema.findAll();
    return users;
}

const getOneUser = async (id) => {
    const user = await userSchema.findByPk(id);
    return user;
}

const getUserByEmail = async (email) => {
    const user = await userSchema.findOne({ 
        where: { email: email }, 
        include: {
            model: roleSchema,
            attributes: ['name'],
            through: {
                model: user_roleSchema, // Inclure la table d'association user_role
                attributes: [], // Exclure tous les attributs de la table d'association
                where: { deleted_date: null }
            }
        },
    });
    return user;
}

const findOneUserByID = async (id) => {
    try {
        const user = await userSchema.findOne(
            {where : {Id_user : id},
            attributes: { exclude: ['password'] },
            include: [
                {
                model: roleSchema,
                attributes: ['name'],
                through: {
                    model: user_roleSchema, // Inclure la table d'association user_role
                    attributes: [], // Exclure tous les attributs de la table d'association
                    where: { deleted_date: null }
                }
                },   
        ]})
            return user
    } catch (error) {
        return error
    }
}
const createUser = async (req, password) => {
    const newUser = await userSchema.create({
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        email : req.body.email,
        password: password,
        created_by: req.body.created_by,
    });
    const findRole = await roleService.findRoleByName(req.body.role); 
    const userFull = await newUser.addRole(findRole,{ through: { created_by: req.body.created_by }});
    return newUser;
}



module.exports = {
    getAllusers,
    getOneUser,
    createUser,
    findOneUserByID,
    getUserByEmail
}