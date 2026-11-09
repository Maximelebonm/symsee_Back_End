const {Sequelize, DataTypes} = require('sequelize')
const db = require("../configs/db.config");

const articleSchema = require('./article.schema');
const articleImageSchema = require('./articleMedia.schema');

const lineArticleSchema = require('./lineArticle.schema');
const lineArticleImage = require('./lineArticleImage.schema');

const roleSchema = require('./role.schema');
const userSchema = require('./user.schema');
// const user_roleSchema = require('./user_role.schema');
const documentSchema = require('./document.schema');
const appelOffreSchema = require('./appelDoffre.schema');
const typeDocumentSchema = require('./typeDocument.schema');


db.sync()

userSchema.hasMany(articleSchema, {foreignKey: 'Id_user'});
userSchema.hasMany(documentSchema, {foreignKey: 'Id_user'});
userSchema.hasMany(appelOffreSchema, {foreignKey: 'Id_user'});
articleSchema.belongsTo(userSchema, {foreignKey: 'Id_user'});

articleSchema.hasMany(lineArticleSchema, {foreignKey: 'Id_article'});
lineArticleSchema.belongsTo(articleSchema, {foreignKey: 'Id_article'});
articleSchema.hasMany(articleImageSchema, {foreignKey: 'Id_article'});
articleImageSchema.belongsTo(articleSchema, {foreignKey: 'Id_article'});

lineArticleSchema.hasMany(lineArticleImage, {foreignKey: 'Id_line_Article'});
lineArticleImage.belongsTo(lineArticleSchema, {foreignKey: 'Id_line_Article'});

documentSchema.belongsTo(typeDocumentSchema, {foreignKey: 'Id_typeDocument'});
typeDocumentSchema.hasMany(documentSchema, {foreignKey: 'Id_typeDocument'});

userSchema.belongsTo(roleSchema, {
    foreignKey: 'roleName',  // ← C'est la clé étrangère
    targetKey: 'name',       // ← roleSchema.name (pas l'ID)
    as: 'role'
});

roleSchema.hasMany(userSchema, {
    foreignKey: 'roleName',
    sourceKey: 'name',       // ← Important !
    as: 'users'
});
