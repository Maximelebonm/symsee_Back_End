const typeDocumentService = require('../services/typeDocument.service');

const getAllTypeDocuments = async (req, res) => {
    try {
        const typeDocuments = await typeDocumentService.getAllTypeDocuments();
        res.status(200).send(typeDocuments);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getOneTypeDocument = async (req, res) => {
    try {
        const typeDocument = await typeDocumentService.getOneTypeDocument(req.params.id);
        if(typeDocument) {
        res.send("ok");
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const createTypeDocument = async (req, res) => {
    try {
        const newTypeDocument = await typeDocumentService.createTypeDocument(req);
        res.status(201).send(newTypeDocument);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updateTypeDocument = async (req, res) => {
    try {
        const typeDocument = await typeDocumentService.updateTypeDocument(req);
        res.status(200).send(typeDocument);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const deleteTypeDocument = async (req, res) => {
    try {
        const typeDocument = await typeDocumentService.deleteTypeDocument(req);
        res.status(200).send(typeDocument);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = { getAllTypeDocuments, getOneTypeDocument, createTypeDocument, updateTypeDocument, deleteTypeDocument }