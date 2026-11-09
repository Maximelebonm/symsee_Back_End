const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const { decodeToken } = require('../security/auth.security');
const storage = require('../configs/storage.config');
const articleService = require('../services/article.service');
const documentService = require('../services/document.service');

const fileFiltermedia = (req, file, cb) => {
    try {
        const filePath = path.join(storage.storageMediaExist, file.originalname);
        // const documentExists = await articleService.checkMediatExistsByName(filePath);

        articleService.checkMediatExistsByName(filePath)
        .then((documentExists) => {
            if (documentExists) {
                const error = new Error("Le fichier existe déjà.");
                error.code = "DOC_EXIST"; // Code d'erreur personnalisé
                return cb(error, false); // Rejette le fichier
            }
            cb(null, true); // Accepte le fichier
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification du fichier :", error);
            cb(error, false); // Rejette en cas d'erreur
        });

    } catch (error) {
        cb(error, false); // Rejette le fichier en cas d'erreur
    }
};

const fileFilterDocs = (req, file, cb) => {
    try {
        const filePath = path.join(storage.storageDocExist, file.originalname);
        documentService.checkDocumentExistsByName(filePath)
        .then((documentExists) => {
            if (documentExists) {
                const error = new Error("Le fichier existe déjà.");
                error.code = "DOC_EXIST"; // Code d'erreur personnalisé
                return cb(error, false); // Rejette le fichier
            }
            cb(null, true); // Accepte le fichier
        })
        .catch((error) => {
            console.error("Erreur lors de la vérification du fichier :", error);
            cb(error, false); // Rejette en cas d'erreur
        });
    } catch (error) {
        return cb(error, false); // Rejette le fichier en cas d'erreur
    }
};

const uploadDocument = multer({
    storage : multer.diskStorage({
    destination : (req,file,cb)=>{
        const path = storage.storageConfigDoc;
        fs.mkdirSync(path, { recursive: true })
        cb(null, path);
    },
    filename : (req,file,cb)=> {
        cb(null,file.originalname)
    }
    }),
    limits : {fileSize : 10000000},
    fileFilter :fileFilterDocs
})

const uploadMedia = multer({
    storage : multer.diskStorage({
    destination : (req,file,cb)=>{
        const path = storage.storageConfigMedia;
        fs.mkdirSync(path, { recursive: true })
        cb(null, path);
    },
    filename : (req,file,cb)=> {
        cb(null,file.originalname)
    }
    }),
    limits : {fileSize : 10000000},
    fileFilter : fileFiltermedia
})

const multerErrorHandler = (err, req, res, next) => {
    let errorMessage = "Erreur lors de l'upload.";
    let statusCode = 500;

    if (!err) {
        return next(); // Passe à la suite si aucune erreur
    }

    if (err instanceof multer.MulterError) {
        switch (err.code) {
            case "LIMIT_FILE_SIZE":
                errorMessage = "Fichier trop volumineux. Max: 10MB.";
                statusCode = 413;
                break;
            case "LIMIT_UNEXPECTED_FILE":
                errorMessage = "Nombre de fichiers dépassé ou champ incorrect.";
                statusCode = 400;
                break;
            default:
                errorMessage = `Erreur Multer: ${err.code}`;
                statusCode = 400;
        }
    } else if (err.code === "DOC_EXIST") {
        errorMessage = "Le fichier existe déjà.";
        statusCode = 409;
    } else {
        console.error("Erreur inconnue:", err);
    }
    console.log(statusCode);
    console.log(err);
    res.status(statusCode).send({ error: errorMessage });
};

module.exports = {uploadDocument, uploadMedia,multerErrorHandler};
