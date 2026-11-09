const {Sequelize, DataTypes} = require('sequelize')
const db = require("../configs/db.config")

const articleSchema = db.define(
    "article",
    {
        Id_article : {
            type : DataTypes.UUID,
            primaryKey : true,
            defaultValue : Sequelize.UUIDV4,
            allowNull : false,
            unique : true,
        },
        title : {
            type : DataTypes.CHAR,
        },
        subtitle:{
            type:DataTypes.CHAR,
        },
        storage : {
            type : DataTypes.TEXT,
        },
        description:{
            type:DataTypes.TEXT,
        },
        lien : {
            type:DataTypes.TEXT,
        },
        visible : {
            type : DataTypes.BOOLEAN,
            defaultValue : false,
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
        tableName : "article",
    }
)

module.exports = articleSchema;