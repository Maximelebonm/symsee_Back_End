const {Sequelize, DataTypes} = require('sequelize')
const db = require("../configs/db.config")

const typeDocumentSchema = db.define(
    "typeDocument",
    {
        Id_typeDocument : {
            type : DataTypes.UUID,
            primaryKey : true,
            defaultValue : Sequelize.UUIDV4,
            allowNull : false,
            unique : true,
        },
        name : {
            type : DataTypes.CHAR,
            allowNull : false,
        },
        created_by : {
            type : DataTypes.CHAR,
            allowNull : false,
            defaultValue : "script",
        },
        created_date : {
            type : DataTypes.DATE,
            defaultValue: new Date(),
            allowNull : false,
        },
        updated_by : {
            type : DataTypes.CHAR,
        },
        updated_date : {
            type : DataTypes.DATE,
        },
        deleted_by : {
            type : DataTypes.CHAR,
            defaultValue : "0" ,
        },
        deleted_date : {
            type : DataTypes.DATE,
        },
    }
)

module.exports = typeDocumentSchema;