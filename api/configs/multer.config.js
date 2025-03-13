const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const { decodeToken } = require('../security/auth.security');
let storageConfig
let storageConfigImage

const date = new Date;
const options = { month: 'long' };
if(process.env.NODE_ENV === "development"){
    storageConfig = '__dirname, ../../storage/documents/' + date.getFullYear() + '/' + date.toLocaleDateString('fr-FR', options) + '/';
    storageConfigImage = '__dirname, ../../storage/images/' + date.getFullYear()
      
} else {
    // storageConfig = process.env.STORAGE_PROD + '/storage'

    storageConfig = '__dirname, ../../storage/documents/' + date.getFullYear() + '/' + date.toLocaleDateString('fr-FR', options) + '/'
    storageConfigImage = '__dirname, ../../storage/images/' + date.getFullYear()
}

const uploadDocument = multer({
    storage : multer.diskStorage({
    destination : (req,file,cb)=>{
        const path = storageConfig;
        fs.mkdirSync(path, { recursive: true })
        cb(null, path);
    },
    filename : (req,file,cb)=> {
        cb(null,file.originalname)
    }
    }),
    limits : {fileSize : 1000000},
    fileFilter : (req,file,cb) =>{
        cb(null,true)
    }
})

const uploadImage = multer({
    storage : multer.diskStorage({
    destination : (req,file,cb)=>{
        const path = storageConfigImage;
        fs.mkdirSync(path, { recursive: true })
        cb(null, path);
    },
    filename : (req,file,cb)=> {
        cb(null,file.originalname)
    }
    }),
    limits : {fileSize : 1000000},
    fileFilter : (req,file,cb) =>{
        cb(null,true)
    }
})

module.exports = {uploadDocument, uploadImage}
