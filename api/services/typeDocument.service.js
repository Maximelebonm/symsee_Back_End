const typeDocumentSchema = require('../schemas/typeDocument.schema.js');

const getAllTypeDocuments = async () => {
    try {
        const typeDocuments = await typeDocumentSchema.findAll()
        return typeDocuments
    } catch (error) {
        return error
    }
}

const getOneTypeDocument = async (id) => {
    try {
        const typeDocument = await typeDocumentSchema.findByPk(id)
        return typeDocument
    } catch (error) {
        return error
    }
}

const createTypeDocument = async (req) => {
    try {
        const typeDocument = await typeDocumentSchema.create({
            name: req.body.name,
            created_by: req.body.created_by
        })
        return typeDocument
    } catch (error) {
        return error
    }
}

const updateTypeDocument = async (req) => {
    try {
        const typeDocument = await typeDocumentSchema.update({
            name: req.body.name,
            updated_by: req.body.updated_by
        }, {
            where: { Id_typeDocument: req.params.id }
        })
        return typeDocument
    } catch (error) {
        return error
    }
}

const deleteTypeDocument = async (req) => {
    try {
        const typeDocument = await typeDocumentSchema.update({
            deleted_by: req.body.deleted_by,
            deleted_date: Date.now()
        }, {
            where: { Id_typeDocument: req.params.id }
        })
        return typeDocument
    } catch (error) {
        return error
    }
}

module.exports = { getAllTypeDocuments, getOneTypeDocument, createTypeDocument, updateTypeDocument, deleteTypeDocument }