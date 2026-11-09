const asyncHandler = require('express-async-handler');
const userService = require('../services/user.service');
const { decodeToken } = require('../security/auth.security');
require('dotenv').config();

const parseCookies = (cookieHeader) => {
    const cookies = {};
    if (!cookieHeader) return cookies;

    cookieHeader.split('; ').forEach(cookie => {
        const [name, ...rest] = cookie.split('=');
        cookies[name.trim()] = rest.join('=').trim();
    });
    return cookies;
};

const protect = asyncHandler(async (req, res, next) => {
    const cookies = parseCookies(req.headers.cookie);
    const token = cookies.auth;
    
    if (!token) {
        return res.status(401).json({ message: "Vous n'êtes pas autorisé à faire cela" });
    }

    let decoded;
    try {
        decoded = decodeToken(token);



    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Vous n'êtes pas autorisé à faire cela" });
    }

    if (!decoded) {
        return res.status(401).json({ message: "Vous n'êtes pas autorisé à faire cela" });
    }
    if (Array.isArray(decoded.role)) {
        // Ancien format détecté -> on force la reconnexion
        res.clearCookie('auth');
        return res.status(401).json({ 
            message: 'Session expirée, veuillez vous reconnecter',
            code: 'TOKEN_FORMAT_OUTDATED'
        });
    }

    const user = await userService.findOneUserByID(decoded.Id_user);

    if (!user) {
        return res.status(401).json({ message: "Vous n'êtes pas autorisé à faire cela" });
    }

    req.user = user;
    next();
});

// Middleware pour vérifier le rôle (relation belongsTo, un seul rôle par user)
const authorize = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role?.name;
        const hasRole = userRole && roles.includes(userRole);
        if (!hasRole) {
            return res.status(403).send({ message: "Accès refusé" });
        }
        next();
    }
}

module.exports = { protect, authorize };