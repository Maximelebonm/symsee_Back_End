const express = require('express');
const articleController = require("../controllers/article.controller");
const router = express.Router();
const {protect} = require('../middlewares/auth.middleware');
const upload = require('../configs/multer.config');

router.get("/",articleController.getAllArticles);
router.get("/visible", articleController.getAllArticlesVisible);
router.get("/one/:id", articleController.getOneArticle);
router.get("/home", articleController.getHomeArticles);
router.post("/create",protect,upload.uploadMedia.single('file') ,upload.multerErrorHandler, articleController.createArticle);
router.put("/update/:id", protect, articleController.updateArticle);
router.put("/delete/:id", protect, articleController.deleteArticle);

module.exports = router;