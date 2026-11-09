const articleSchema = require('../schemas/article.schema');
const articleMediaSchema = require('../schemas/articleMedia.schema');
const lineArticleSchema = require('../schemas/lineArticle.schema');

const getAllArticles = async () => {
    try {
        const articles = await articleSchema.findAll({
            include: articleMediaSchema,
            where : {
                deleted_date : null,

            },
            order: [['created_date', 'ASC']],
        })
        return articles
    } catch (error) {
        return error
    }
}

const checkMediatExistsByName = async (filename) => {
    try {
        const formattedFilename = filename.replace(/\//g, '\\')
        const document = await articleMediaSchema.findOne({ where: { storage: formattedFilename} });
        return document !== null;
        
    } catch (error) {
        
    }
};


const getAllArticlesVisible = async () => {
    try {
        const articles = await articleSchema.findAll({
            where: {
                visible : true,
                deleted_date: null
            },
            include: articleMediaSchema

        })
        return articles
    } catch (error) {
        return error
    }
}

const getHomeArticles = async () => {
    try {
        const articles = await articleSchema.findAll({
            where: {
                visible: true,
                deleted_date: null
            },
            include: articleMediaSchema,
            limit: 4,
            order: [['created_date', 'DESC']],
        })
        return articles
    } catch (error) {
        return error
    }
}

const getOneArticle = async (id) => {
    try {
        const article = await articleSchema.findByPk(id, {
            include: articleMediaSchema
        })
        return article
    } catch (error) {
        return error
    }
}

const createArticle = async (req) => {
    try {
        const article = await articleSchema.create({
            title: req.body.titleArticle,
            subtitle: req.body.subtitleArticle,
            description: req.body.descArticle,
            visible: req.body.visible === 'on' ? true : false,
            lien : req.body.lienArticle,
            auteur : req.body.AuteurArticle,
            position : req.body.positionMedia,
            created_by: req.user.firstName + ' ' + req.user.lastName,
            Id_user : req.user.Id_user,
            created_date: Date.now(),
        })
        const articleMedia = await articleMediaSchema.create({
            storage : req?.file?.path || '',
            type : req?.body?.type || '',
            position : req.body.positionMedia,
            Id_article: article.Id_article,
            created_by: req.user.firstName + ' ' + req.user.lastName,
            created_date: Date.now(),
        })
        return article
    } catch (error) {
        return error
    }
}

const updateArticle = async (req) => {
    try {
        const updateData = {
            title: req.body.titleArticle,
            subtitle: req.body.subtitleArticle,
            description: req.body.descArticle,
            visible: req.body.visible === 'on' ? true : false,
            lien : req.body.lienArticle,
            auteur : req.body.AuteurArticle,
            position : req.body.positionMedia,
            updated_by: req.user.firstName + ' ' + req.user.lastName,
            updated_date : Date.now(),
        }

        const article = await articleSchema.update(updateData,
        {where: { Id_article: req.params.id}})

        if(req.file !== undefined){
            const articleMedia = await articleMediaSchema.update({
                storage : req?.file?.path || '',
                type : req?.body?.type || '',
                position : req.body.positionMedia,
    
                updated_by: req.user.firstName + ' ' + req.user.lastName,
                updated_date : Date.now(),
            },{
                where : {
                    Id_article: req.params.id
                }
            })
        }
        else {
            const articleMedia = await articleMediaSchema.update({
                position : req.body.positionMedia,
                updated_by: req.user.firstName + ' ' + req.user.lastName,
                updated_date : Date.now(),
            },{
                where : {
                    Id_article: req.params.id
                }
            })
        }
        return article
    } catch (error) {
        return error
    }
}

const deleteArticle = async (req) => {
    try {
        const article = await articleSchema.update({
            deleted_by: req.user.firstName + ' ' + req.user.lastName,
            deleted_date: new Date()
        }, {
            where: {
                Id_article: req.params.id
            }
        })
        const articleMedia = await articleMediaSchema.update({
            deleted_by: req.user.firstName + ' ' + req.user.lastName,
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

module.exports = { getAllArticles, getOneArticle , createArticle, updateArticle, deleteArticle,getAllArticlesVisible, getHomeArticles,checkMediatExistsByName }