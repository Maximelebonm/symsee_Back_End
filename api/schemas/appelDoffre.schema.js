const {Sequelize, DataTypes} = require('sequelize')
const db = require("../configs/db.config")

const appelDoffreSchema = db.define(
    "appelDoffre",
    {
        Id_appelDoffre : {
            type : DataTypes.UUID,
            primaryKey : true,
            defaultValue : Sequelize.UUIDV4,
            allowNull : false,
            unique : true,
        },
        title : {
            type : DataTypes.CHAR,
        },
        description:{
            type:DataTypes.TEXT,
        },
        addresse : {
            type:DataTypes.CHAR,
        },
        datelimite:{
            type:DataTypes.DATE,
        },
        visible:{
            type:DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : false,
        },
        lien : {
            type : DataTypes.CHAR,
        },
        structure :{
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
            defaultValue : "0" ,
            allowNull : false,
        },
        deleted_date : {
            type : DataTypes.DATE,
        },
    },
    {
        freezeTablename : true,
        timestamps : false,
        tableName : "appelDoffre",
    }
)

module.exports = appelDoffreSchema