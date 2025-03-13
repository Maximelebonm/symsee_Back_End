const typeDocumentSchema = require("../schemas/typedocument.schema")

const typeInit = async () => {
    try{
        const typeDocumentCreated = await typeDocumentSchema.bulkCreate([
            { name : 'compte rendu', created_by : 'script'},
            { name : 'Etude', created_by : 'script'},
          ]);
        return "OK";
    } catch (err) {
        return err
    }
}

module.exports = typeInit