const { or, where } = require('sequelize');
const docuemntschema = require('../schemas/document.schema');
const typeDocumentSchema = require('../schemas/typeDocument.schema');

const getAllDocuments = async () => {
    const documents = await docuemntschema.findAll({
        include: {
            model: typeDocumentSchema,
            as: 'typeDocument',
            attributes: ['Id_typeDocument', 'name']
        },
        order: [['created_date', 'DESC']],
        where: { deleted_by: "0" }
    });
    return documents;
}

const getOneDocument = async (id) => {
    const document = await docuemntschema.findByPk(id);
    return document;
}

const createDocument = async (req) => {
    const newDocument = await docuemntschema.create({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        Id_typeDocument : req.body.type,
        auteur : req.body.auteur,
        visible : req.body.visible === 'on' ? true : false,
        storage_doc: req.file.path,
        created_by: req.user.firstName + ' ' + req.user.lastName,
        Id_user : req.user.Id_user
    });
    return newDocument;
}

const updateDocument = async (req) => {
    const updateData = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        Id_typeDocument: req.body.type,
        auteur: req.body.auteur,
        visible: req.body.visible === 'on' ? true : false,
        updated_by: req.user.firstName + ' ' + req.user.lastName,
        updated_date: Date.now(),
    };

    // Ajoutez storage_doc uniquement si req.body.path existe
    if (req.file !== undefined) {
        updateData.storage_doc = req.file.path;
    }

    const document = await docuemntschema.update(updateData, {
        where: { Id_document: req.params.id }
    });
    return document;
}

const deleteDocument = async (req) => {
    const document = await docuemntschema.update({
        deleted_by: req.user.firstName + ' ' + req.user.lastName,
        deleted_date: Date.now()
    }, {
        where: { Id_document: req.params.id }
    });
    return document;
}

module.exports = { getAllDocuments, getOneDocument, createDocument, updateDocument, deleteDocument }