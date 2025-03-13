const roleSchema = require('../schemas/role.schema');
const typeDocumentSchema = require('../schemas/typedocument.schema')
const userController = require("../controllers/user.controller")
const userService = require('../services/user.service')
const roleInit = require('./role.script')
const typeDocumentInit = require('./typeDocument.script')

require('dotenv').config()

const db = require('../configs/db.config')

const roleService = require('../services/role.service');

const adminUser = {
    body : {
        firstName : 'admin',
        lastName : 'admin',
        email : process.env.EMAIL,
        password : process.env.PASS,
        role : 'administrator',
        created_by : 'script',
    }
}


const initData = async ()=> {
    if (!adminUser.body.email || !adminUser.body.password) {
        throw new Error("Admin email or password not defined in environment variables");
    }
    try {
        await db.sync();
        const roles = await roleSchema.findAll()
        const typeDocuments = await typeDocumentSchema.findAll()
        if(roles.length == 0 && typeDocuments.length == 0){
                const roleInitialized =  await roleInit()
                const typeDocumentinitialized = await typeDocumentInit()
            if(roleInitialized === "OK"){
                const userCreated = await userController.registerFirstUser(adminUser)
                if(userCreated){
                    const user = await userService.findOneUserByID(userCreated.Id_user)
                    const addRole = await roleService.addRole(adminUser,user)
                    return 'db initialized , userAdmin created';
                } 
            } else {
                return "Initialization failed: roles, materials, or categories not created.";
            }
        } else {
           return "Database already initialized";
        }
    } catch (err) {
        return err
    }
}

module.exports = initData;