const documentServices = require('../services/document.service');
const typeDocumentServices = require('../services/typeDocument.service');
const security = require('../security/auth.security');
const upload = require('../configs/multer.config');
const path = require('path');
const express = require('express');
const fs = require('fs');


const getAllDocuments = async (req, res) => {
    try {
        const documents = await documentServices.getAllDocuments();
        res.status(200).send({data : documents, fileDest : express.static(path.join(__dirname, '../../../storage'))});
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getOneDocument = async (req, res) => {
    try {
        const document = await documentServices.getOneDocument(req.params.id);
        if(document) {
        res.send("ok");
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const createDocument = async (req, res,next) => {
    try {
        console.log(next)
        const pictureConfig = await upload.uploadDocument.single('file')(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ message: err.message });
            }
            const getTypeOfDocument = await typeDocumentServices.getOneTypeDocument(req.body.type);
            const newDocument = await documentServices.createDocument(req, getTypeOfDocument);
            res.status(201).send(pictureConfig);
        });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updateDocument = async (req, res,next) => {
    try {
            const pictureConfig = await upload.uploadDocument.single('file')(req, res, async (err) => {
                if (err) {
                    return res.status(400).send({ message: err.message });
                }
                if(req.body.lastfile && req.file !== undefined){
                    const filename = req.body.lastfile;
                    const filePath = path.join(__dirname, `../../`, filename);
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Erreur lors de la suppression du fichier:', err);
                            return res.status(500).send('Erreur lors de la suppression du fichier');
                        }
                    });
                }
                const getTypeOfDocument = await typeDocumentServices.getOneTypeDocument(req.body.type);
                const newDocument = await documentServices.updateDocument(req, getTypeOfDocument);

                res.status(201).send(pictureConfig);
            });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const deleteDocument = async (req, res) => {
    try {
        const getDocument = await documentServices.getOneDocument(req.params.id);
        const filename = getDocument.storage_doc;
        const filePath = path.join(__dirname, `../../`, filename);

        console.log('Trying to delete file at path:', filePath);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Erreur lors de la suppression du fichier:', err);
                return res.status(500).send('Erreur lors de la suppression du fichier');
            }
        });
        const document = await documentServices.deleteDocument(req);
        res.status(200).send(document);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = { getAllDocuments, getOneDocument, createDocument, updateDocument, deleteDocument }