const userSchema = require('../schemas/user.schema');
const roleSchema = require('../schemas/role.schema');
const roleService = require('./role.service');
const db = require('../configs/db.config');

const getAllusers = async () => {
    const users = await userSchema.findAll({
        attributes: { exclude: ['password'] },
        include: {
            model: roleSchema,
            as: 'role',
            attributes: ['name'],
        },
        order: [['created_date', 'DESC']],
    });
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
            as: 'role',
            attributes: ['name'],
        },
    });
    return user;
}

const getProfile = async (Id_user)=>{
        try {
        const user = await userSchema.findOne({
            where: { Id_user },
            attributes: ['Id_user', 'email', 'firstName', 'lastName', 'roleName']
            // on exclut le password
        });

        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        console.log('getme' + user)

        return user;
    } catch (error) {
        throw error;
    }
};

const findOneUserByID = async (id) => {
    try {
        const user = await userSchema.findOne({
            where: { Id_user: id },
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: roleSchema,
                    as: 'role',
                    attributes: ['name'],
                },
            ]
        });
        return user;
    } catch (error) {
        return error;
    }
}

const createUser = async (req, password) => {
    const findRole = await roleService.findRoleByName(req.body.role);

    const newUser = await userSchema.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: password,
        Id_role: findRole.Id_role,
        created_by: req.body.created_by,
    });

    return newUser;
}

const updateUser = async (id, data, modifiedBy) => {
    try {
        const user = await userSchema.findByPk(id);
        
        // Vérifier que l'utilisateur existe et n'est pas supprimé
        if (!user || user.deleted_date) {
            return null;
        }

        // Préparer les données à mettre à jour
        const updateData = {
            firstName: data.firstName ?? user.firstName,
            lastName: data.lastName ?? user.lastName,
            email: data.email ?? user.email,
            updated_by: modifiedBy,
            updated_date: new Date(),
        };

        // Gérer le changement de rôle si fourni
        if (data.role) {
            const newRole = await roleService.findRoleByName(data.role);
            if (!newRole) {
                throw new Error(`Le rôle '${data.role}' n'existe pas`);
            }
            updateData.Id_role = newRole.Id_role;
        }

        // Mettre à jour l'utilisateur
        await user.update(updateData);

        // Retourner l'utilisateur mis à jour avec ses relations
        return await findOneUserByID(id);
    } catch (error) {
        console.error("Erreur updateUser :", error);
        throw error;
    }
};

const deleteUser = async (id, deletedBy) => {
    const user = await userSchema.findByPk(id);
    if (!user || user.deleted_date) return null;

    await user.update({
        deleted_by: deletedBy,
        deleted_date: new Date(),
    });
    return user;
}

const unlockUser = async (id, modifiedBy) => {
    const user = await userSchema.findByPk(id);
    if (!user) return null;
    if (!user.deleted_date) return user;

    await user.update({
        deleted_date: null,
        deleted_by: "0",
        updated_by: modifiedBy,
        updated_date: new Date(),
    });
    return user;
}

module.exports = {
    getAllusers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    unlockUser,
    findOneUserByID,
    getUserByEmail,
    getProfile
}