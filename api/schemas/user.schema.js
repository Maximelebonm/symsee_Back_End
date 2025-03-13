const {Sequelize, DataTypes} = require('sequelize')
const db = require("../configs/db.config")

const role = require('./role.schema')

const userSchema = db.define(
    "users",
    {
        Id_user : {
            type : DataTypes.UUID,
            primaryKey : true,
            defaultValue : Sequelize.UUIDV4,
            allowNull : false,
            unique : true,
        },
        email : {
            type : DataTypes.CHAR,
            unique : true,
            allowNull:false,
            validate : {
                isEmail : true,
            }
        },
        firstName : {
            type : DataTypes.CHAR,

        },
        lastName : {
            type : DataTypes.CHAR,

        },
        password:{
            type:DataTypes.TEXT,
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
        tableName : "users",
    }
)

module.exports = userSchema;