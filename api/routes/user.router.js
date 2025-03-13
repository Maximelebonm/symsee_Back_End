const express = require('express');
const userController = require("../controllers/user.controller.js");
const router = express.Router();
const protect = require('../middlewares/auth.middleware');

router.get("/", protect,userController.getAllUser);
router.get("/:id", protect,userController.getOneUser);
router.post("/create", protect, userController.createUser);
router.put("/update/:id", protect, userController.updateUser);
router.put("/delete/:id", protect, userController.deleteUser);
router.post("/login", userController.loginUser);
router.post("/logout",protect, userController.logoutUser);
// router.post("/forgotpassword", userController.forgotPassword);
// router.post("/verifyemail", userController.verifyEmail);

module.exports = router;