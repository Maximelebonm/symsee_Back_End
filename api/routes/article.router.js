const express = require('express');
const articleController = require("../controllers/article.controller");
const router = express.Router();
const protect = require('../middlewares/auth.middleware');

router.get("/", protect,articleController.getAllArticles);
router.get("/visible", articleController.getAllArticlesVisible);
router.get("/:id", articleController.getOneArticle);
router.post("/create", protect, articleController.createArticle);
router.put("/update/:id", protect, articleController.updateArticle);
router.put("/delete/:id", protect, articleController.deleteArticle);

module.exports = router;