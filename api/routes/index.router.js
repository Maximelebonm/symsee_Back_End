const express = require('express')
const router = express.Router();

router.use(express.urlencoded({extended : true}));
router.use(express.json());

const userRoutes = require('./user.router');
const articleRoutes = require('./article.router');
const documentRoutes = require('./document.router');
const typeDocumentRoutes = require('./typeDocument.router');
const appelDoffreRoutes = require('./appelDoffre.router');



router.use('/user', userRoutes);

router.use('/article', articleRoutes);
router.use('/document', documentRoutes);
router.use('/typeDocument', typeDocumentRoutes);
router.use('/appeldoffre', appelDoffreRoutes);

module.exports = router;