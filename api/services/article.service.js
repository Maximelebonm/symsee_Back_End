const articleSchema = require('../schemas/article.schema');
const lineArticleSchema = require('../schemas/lineArticle.schema');

const getAllArticles = async () => {
    try {
        const articles = await articleSchema.findAll({
            include: lineArticleSchema
        })
        return articles
    } catch (error) {
        return error
    }
}

const getAllArticlesVisible = async () => {
    try {
        const articles = await articleSchema.findAll({
            where: {
                visible : true,
                deleted_date: null
            },
            include: lineArticleSchema

        })
        return articles
    } catch (error) {
        return error
    }
}

const getOneArticle = async (id) => {
    try {
        const article = await articleSchema.findByPk(id, {
            include: lineArticleSchema
        })
        return article
    } catch (error) {
        return error
    }
}

const createArticle = async (req) => {
    try {
        const article = await articleSchema.create({
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            media: req.body.media,
            auteur : req.body.auteur,
            created_by: req.body.created_by
        })
        return article
    } catch (error) {
        return error
    }
}

const updateArticle = async (req) => {
    try {
        const article = await articleSchema.update({
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            media: req.body.media,
            auteur : req.body.auteur,
            updated_by: req.body.updated_by
        }, {
            where: {
                Id_article: req.params.id
            }
        })
        return article
    } catch (error) {
        return error
    }
}

const deleteArticle = async (req) => {
    try {
        const article = await articleSchema.update({
            deleted_by: req.body.deleted_by,
            deleted_date: new Date()
        }, {
            where: {
                Id_article: req.params.id
            }
        })
        return article
    } catch (error) {
        return error
    }
}

module.exports = { getAllArticles, getOneArticle , createArticle, updateArticle, deleteArticle,getAllArticlesVisible }