const express = require('express');
const router = express.Router();
const {protect} = require('../middlewares/auth.middleware');
const documentController = require('../controllers/document.controller');
const upload = require('../configs/multer.config');

router.get("/", documentController.getAllDocuments);
router.get("/:id", documentController.getOneDocument);
router.post("/create", protect, upload.uploadDocument.single('file') , upload.multerErrorHandler, documentController.createDocument);
router.put("/update/:id", protect, documentController.updateDocument);
router.put("/delete/:id", protect, documentController.deleteDocument);

module.exports = router;