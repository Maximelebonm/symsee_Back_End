const roleSchema = require('../schemas/role.schema');

const roleInit = async () => {
    try{
        const roleCreated = await roleSchema.bulkCreate([
            { name : 'moderator', created_by : 'script'},
            { name : 'administrator', created_by : 'script'},
          ]);
        return "OK";
    } catch (err) {
        return err
    }
}

module.exports = roleInit