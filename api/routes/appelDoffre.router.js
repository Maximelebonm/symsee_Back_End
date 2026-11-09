const express = require('express');
const router = express.Router();
const {protect} = require('../middlewares/auth.middleware');
const appelDoffreController = require('../controllers/appelDoffre.controller');

router.get("/", appelDoffreController.getAllAppelDoffres);
router.get("/:id", appelDoffreController.getOneAppelDoffre);
router.post("/create",protect, appelDoffreController.createAppelDoffre);
router.put("/update/:id", protect, appelDoffreController.updateAppelDoffre);
router.put("/delete/:id", protect, appelDoffreController.deleteAppelDoffre);

module.exports = router;