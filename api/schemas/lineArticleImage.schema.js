const {Sequelize, DataTypes} = require('sequelize')
const db = require("../configs/db.config")


const productImagesSchema = db.define(
    "linearticleimage",
    {
        Id_line_article_image : {
            type : DataTypes.UUID,
            primaryKey : true,
            allowNull : false,
            defaultValue : Sequelize.UUIDV4,
            unique : true,
        },
        name : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        storage : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        order : {
            type : DataTypes.FLOAT,
            allowNull : false,
        },
        archived : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
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
        tableName : "linearticleimage",
    }
    )

module.exports = productImagesSchema;