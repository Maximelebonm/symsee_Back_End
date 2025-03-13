const {Sequelize, DataTypes} = require('sequelize')
const db = require("../configs/db.config")

const documentSchema = db.define(
    "document",
    {
        Id_document : {
            type : DataTypes.UUID,
            primaryKey : true,
            defaultValue : Sequelize.UUIDV4,
            allowNull : false,
            unique : true,
        },
        title : {
            type : DataTypes.CHAR,
            allowNull : false,
        },
        subtitle:{
            type:DataTypes.CHAR,
        },
        description:{
            type:DataTypes.TEXT,
            allowNull : false,
        },
        visible:{
            type:DataTypes.BOOLEAN,
            allowNull : false,
        },
        storage_doc:{
            type:DataTypes.TEXT,
            allowNull : false,
            defaultValue : 'test',
        },
        auteur:{
            type:DataTypes.CHAR,
      
        },
        created_by : {
            type : DataTypes.CHAR,
            allowNull : false,
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
            defaultValue : "0",
            allowNull : false,
        },
        deleted_date : {
            type : DataTypes.DATE,
        },
    },
    {
        freezeTablename : true,
        timestamps : false,
        tableName : "document",
    }
)



module.exports = documentSchema;