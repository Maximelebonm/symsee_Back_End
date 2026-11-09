let storageConfigDoc;
let storageDocExist;
let storageConfigMedia;
let storageMediaExist;
const date = new Date;
const options = { month: 'long' };

if(process.env.NODE_ENV === "development"){
    storageConfigDoc = '__dirname, ../../storage/documents/' + date.getFullYear() + '/' + date.toLocaleDateString('fr-FR', options) + '/';
    storageDocExist = 'storage/documents/' + date.getFullYear() + '/' + date.toLocaleDateString('fr-FR', options) + '/';
    storageConfigMedia = '__dirname, ../../storage/Medias/' + date.getFullYear();
    storageMediaExist = 'storage/Medias/' + date.getFullYear() + '/';
      
} else {

    storageConfigDoc =  'storage/documents/' + date.getFullYear() + '/' + date.toLocaleDateString('fr-FR', options) + '/'
    storageDocExist = 'storage/documents/' + date.getFullYear() + '/' + date.toLocaleDateString('fr-FR', options) + '/';
    storageConfigMedia = 'storage/Medias/' + date.getFullYear();
    storageMediaExist = 'storage/Medias/' + date.getFullYear() + '/';
}

module.exports = {storageConfigDoc, storageConfigMedia, storageDocExist, storageMediaExist}