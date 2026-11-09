const {Sequelize, DataTypes} = require('sequelize')
const db = require("../configs/db.config")


const productMediaSchema = db.define(
    "articleMedia",
    {
        Id_article_media : {
            type : DataTypes.UUID,
            primaryKey : true,
            allowNull : false,
            defaultValue : Sequelize.UUIDV4,
            unique : true,
        },
        storage : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        type : {
            type : DataTypes.TEXT,
        },
        order : {
            type : DataTypes.FLOAT,
            allowNull : false,
            defaultValue : 0,
        },
        position : {
            type : DataTypes.FLOAT,
            allowNull : false,
            defaultValue : 0,
        },
        archived : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : false,
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
            defaultValue : false,
        },
        deleted_date : {
            type : DataTypes.DATE,
        },
    },
    {
        freezeTablename : true,
        timestamps : false,
        tableName : "articleMedia",
    }
    )

module.exports = productMediaSchema;