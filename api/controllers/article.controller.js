const articleService = require('../services/article.service');
const upload = require('../configs/multer.config');
const storageConfig = require('../configs/storage.config');
const path = require('path');
const fs = require('fs');

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

const getHomeArticles = async (req, res) => {
    try {
        const articles = await articleService.getHomeArticles();
        res.status(200).send(articles);
    } catch (error) {
        res.status(400)
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
        const pictureConfig = await upload.uploadMedia.single('file')(req, res, async (err) => {
                        if (err) {
                            return res.status(401).send({ message: err.message });
                        }
                        if(req.body.lastfile && req.file !== undefined){
                            const filename = req.body.lastfile;
                            const filePath = path.join(__dirname, `../../`, filename);
                            fs.unlink(filePath, (err) => {
                                if (err) {
                                    console.error('Erreur lors de la suppression du fichier:', err);
                                    return res.status(500).send('Erreur lors de la suppression du fichier');
                                }
                            });
                        }
                        const article = await articleService.updateArticle(req);
                        res.status(200).send(pictureConfig);
                    });
       
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteArticle = async (req, res) => {
    try {
        const getOneArticle = await articleService.getOneArticle(req.params.id);
        const filename = getOneArticle.articleMedia[0].storage;
        const filePath = path.join(__dirname, `../../`, filename);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Erreur lors de la suppression du fichier:', err);
                return res.status(500).send('Erreur lors de la suppression du fichier');
            }
        });


        const article = await articleService.deleteArticle(req);
        res.status(200).send(article);
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = { getAllArticles, getOneArticle, createArticle, updateArticle, deleteArticle,getAllArticlesVisible, getHomeArticles }