const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth.middleware');
const typeDocumentController = require('../controllers/typeDocument.controller');
const upload = require('../configs/multer.config');

router.get("/", protect, typeDocumentController.getAllTypeDocuments);
router.get("/:id", protect, typeDocumentController.getOneTypeDocument);
router.post("/create", protect, typeDocumentController.createTypeDocument);
router.put("/update/:id", protect, typeDocumentController.updateTypeDocument);
router.put("/delete/:id", protect, typeDocumentController.deleteTypeDocument);

module.exports = router;