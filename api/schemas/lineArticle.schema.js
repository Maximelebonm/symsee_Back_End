const {Sequelize, DataTypes} = require('sequelize')
const db = require("../configs/db.config")

const article = require('./article.schema')

const lineArticleSchema = db.define(
    "lineArticle",
    {
        Id_line_Article : {
            type : DataTypes.UUID,
            primaryKey : true,
            defaultValue : Sequelize.UUIDV4,
            allowNull : false,
            unique : true,
        },
        title : {
            type : DataTypes.CHAR,
        },
        subtitle : {
            type : DataTypes.CHAR,
        },
        body:{
            type:DataTypes.TEXT,
        },
        media:{
            type:DataTypes.TEXT,
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
        tableName : "lineArticle",
    }
)
lineArticleSchema.belongsTo(article,{
    foreignKey : 'Id_article',
})

module.exports = lineArticleSchema;