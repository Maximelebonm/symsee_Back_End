const documentSchema = require('../schemas/document.schema');
const typeDocumentSchema = require('../schemas/typeDocument.schema');

const getAllDocuments = async () => {
    const documents = await documentSchema.findAll({
        include: {
            model: typeDocumentSchema,
            as: 'typeDocument',
            attributes: ['Id_typeDocument', 'name']
        },
        order: [['created_date', 'DESC']],
        where: { deleted_date: null }
    });
    return documents;
}

const getOneDocument = async (id) => {
    const document = await documentSchema.findByPk(id);
    return document;
}

const checkDocumentExistsByName = async (filename) => {
    const formattedFilename = filename.replace(/\//g, '\\')
    const document = await documentSchema.findOne({ where: { storage_doc: formattedFilename} });
    return document !== null;
};

const createDocument = async (req) => {
    const newDocument = await documentSchema.create({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        Id_typeDocument : req.body.type,
        auteur : req.body.auteur,
        visible : req.body.visible === 'on' ? true : false,
        storage_doc: req.file.path,
        created_by: req.user.firstName + ' ' + req.user.lastName,
        Id_user : req.user.Id_user,
        created_date: Date.now(),
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

    const document = await documentSchema.update(updateData, {
        where: { Id_document: req.params.id }
    });
    return document;
}

const deleteDocument = async (req) => {
    const document = await documentSchema.update({
        deleted_by: req.user.firstName + ' ' + req.user.lastName,
        storage_doc: 'deleted',
        deleted_date: Date.now()
    }, {
        where: { Id_document: req.params.id }
    });
    return document;
}

module.exports = { getAllDocuments, getOneDocument, createDocument, updateDocument, deleteDocument,checkDocumentExistsByName }