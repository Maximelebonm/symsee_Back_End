const express = require('express');
const userController = require("../controllers/user.controller.js");
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth.middleware');
const { TokenExpiredError } = require('jsonwebtoken');
const security = require('../security/auth.security.js');
const jwt = require('jsonwebtoken');

const parseCookies = (cookieHeader) => {
    if (!cookieHeader) {
        return {}; // Retourne un objet vide si aucun cookie n'est présent
    }
    else {
        const cookies = {};
    
        cookieHeader.split('; ').forEach(cookie => {
          const [name, ...rest] = cookie.split('=');
          cookies[name.trim()] = rest.join('=').trim();
        });
        return cookies;
    }
  };



router.get("/all", protect,userController.getAllUser);
router.get("/one/:id", protect,userController.getOneUser);
router.post("/create", protect,authorize('administrator'), userController.createUser);
router.put("/update/:id", protect,authorize('administrator'), userController.updateUser);
router.put("/lock/:id", protect,authorize('administrator'), userController.deleteUser);
router.put("/unlock/:id", protect, authorize('administrator'), userController.unlockUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.get("/me", protect, userController.getprofile);


router.get("/auth", (req, res) => {
    if (!req.headers.cookie) {
        return res.status(200).json({ message: "Aucun cookie trouvé, utilisateur non authentifié" });
    }
        const cookieauth = parseCookies(req.headers.cookie);
        try {
            const user = security.decodeToken(cookieauth.auth); // Fonction qui vérifie le JWT
            console.log('user : ' + user)
            res.status(200).send(user); // Retourner l'utilisateur
        } catch (error) {
            res.status(401).json({ error: 'Token invalide' });
        }
    });

// router.post("/forgotpassword", userController.forgotPassword);
// router.post("/verifyemail", userController.verifyEmail);

module.exports = router;