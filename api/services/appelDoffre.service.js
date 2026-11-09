const appelDoffreSchema = require("../schemas/appelDoffre.schema");

const getAllAppelDoffres = async () => {
    try {
        const appelDoffres = await appelDoffreSchema.findAll()
        return appelDoffres
    } catch (error) {
        return error
    }
}

const getOneAppelDoffre = async (id) => {
    try {
        const appelDoffre = await appelDoffreSchema.findByPk(id)
        return appelDoffre
    } catch (error) {
        return error
    }
}

const createAppelDoffre = async (req) => {
    try {
        const appelDoffre = await appelDoffreSchema.create({
            title : req.body.title,
            description: req.body.description,
            address : req.body.address,
            datelimite : req.body.datelimite,
            visible : req.body.visible === 'on' ? true : false,
            lien : req.body.lien,
            structure : req.body.structure,
            created_by : req.user.firstName + ' ' + req.user.lastName,
            Id_user : req.user.Id_user,
            created_date: Date.now(),
        })
        return appelDoffre
    }
    catch (error) {
        return error
    }
}

const updateAppelDoffre = async (req) => {
    try {
        const updateData = {
            title : req.body.title,
            description: req.body.description,
            address : req.body.address,
            datelimite : req.body.datelimite,
            visible : req.body.visible === 'on' ? true : false,
            lien : req.body.lien,
            structure : req.body.structure,
            updated_by : req.user.firstName + ' ' + req.user.lastName,
            updated_date : Date.now()
        }
        const appelDoffre = await appelDoffreSchema.update(updateData, {
            where : { Id_appelDoffre : req.params.id }
        })
        return appelDoffre
    } catch (error) {
        return error
    }
}

const deleteAppelDoffre = async (req) => {
    try {
        const appelDoffre = await appelDoffreSchema.update({
            deleted_by : req.user.firstName + ' ' + req.user.lastName,
            deleted_date : Date.now()
        }, {
            where : { Id_appelDoffre : req.params.id }
        })
        return appelDoffre
    } catch (error) {
        return error
    }
}

module.exports = { getAllAppelDoffres, getOneAppelDoffre, createAppelDoffre, updateAppelDoffre, deleteAppelDoffre }