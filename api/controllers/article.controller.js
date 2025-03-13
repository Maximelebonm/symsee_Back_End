const articleService = require('../services/article.service');

const getAllArticles = async (req, res) => {
    try {
        const articles =    await articleService.getAllArticles();
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllArticlesVisible = async (req, res) => {
    try {
        const articles = await articleService.getAllArticlesVisible();
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send(error)
    }
}

const getOneArticle = async (req, res) => {
    try {
        const article = await articleService.getOneArticle(req.params.id);
        res.status(200).send(article);
    } catch (error) {
        res.status(500).send(error)
    }
}

const createArticle = async (req, res) => {
    try {
        const article = await articleService.createArticle(req);
        res.status(200).send(article);
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateArticle = async (req, res) => {
    try {
        const article = await articleService.updateArticle(req);
        res.status(200).send(article);
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteArticle = async (req, res) => {
    try {
        const article = await articleService.deleteArticle(req);
        res.status(200).send(article);
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = { getAllArticles, getOneArticle, createArticle, updateArticle, deleteArticle,getAllArticlesVisible }