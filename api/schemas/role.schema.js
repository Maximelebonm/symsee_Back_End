const {Sequelize, DataTypes} = require('sequelize')
const db = require("../configs/db.config")

const roleSchema = db.define(
    "role",
    {
        Id_role : {
            type : DataTypes.UUID,
            primaryKey : true,
            allowNull : false,
            defaultValue : Sequelize.UUIDV4,
        },
        name : {
            type : DataTypes.CHAR,
            allowNull : false,
            unique : true,
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
        tableName : "role",
    }
    
    )

module.exports = roleSchema;