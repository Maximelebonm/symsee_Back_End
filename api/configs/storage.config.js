let storageConfig
if(process.env.NODE_ENV === "development"){
    storageConfig = {
        storageImage : '__dirname, ../../storage',
        storageDoc : '__dirname, ../../documents'
    }
      
} else {
    storageConfig = {
        storageImage : process.env.STORAGE_PROD + '/storage',
        storageDoc : process.env.STORAGE_PROD + '/documents'
    }
}

module.exports = storageConfig