const userService = require('../services/user.service');
const security = require('../security/auth.security');
const config = require('../configs/app.config');
// const mailService = require('../services/mail.service');
const cookieConfig = require('../configs/cookie.config');

const getAllUser = async (req, res) => {
    try {
        const users = await userService.getAllusers();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getOneUser = async (req, res) => {
    try {
        const user = await userService.getOneUser(req.params.id);
        if(user) {
        res.status(200).send(user);
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const registerFirstUser = async (req,res) => {
    try {
        const password = await security.hashPassword(req.body.password);
        const request = await userService.createUser(req,password);
        return request;
    } catch (err) {
        return err;
    }
}


const loginUser = async (req,res) => {
    try {
        const findUser = await userService.getUserByEmail(req.body.email);
        if (!findUser) {
            console.log(findUser)
            return res.status(200).send({ message: 'email invalide' });
        }
           if (findUser.deleted_date) {
            console.log(findUser)
            return res.status(200).send({ message: 'Acces non autorise' });
        }
        if(findUser){
            console.log(findUser.role)
            const comparePassword = await security.comparePassword(req.body.password,findUser.password);
            if(comparePassword){
                console.log(cookieConfig)
                const accessToken = security.jwtsecurity(findUser)
                res.cookie('auth', accessToken,cookieConfig)
                res.status(200).send({message : 'connection autorisé'});
            }
            else {
                res.status(200).send({message : 'mot de passe incorrect'});
            }
        }
        else {
            res.status(200).send({message : 'email invalide'});
        }
    } catch (err) {
        res.status(404).send(err);
    }
}

const getprofile = async (req,res)=>{
    try {
        const Id_user = req.user.Id_user; // vient du middleware d'auth

        const user = await userService.getProfile(Id_user);

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        if (error.message === 'Utilisateur non trouvé') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erreur serveur' });
    }

}

const unlockUser = async (req, res) => {
    try {
        const user = await userService.unlockUser(req.params.id, req.user.email);
        if (!user) return res.status(404).send({ message: "Utilisateur introuvable" });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('auth');
        res.status(200).send({ message: 'User logged out' });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const hashedPassword = await security.hashPassword(req.body.password);
        req.body.created_by = req.user.email; // ou Id_user, selon ce que tu veux tracer
        const newUser = await userService.createUser(req, hashedPassword);
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body, req.user.email);
        if (!user) return res.status(404).send({ message: "Utilisateur introuvable" });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        if (String(req.params.id) === String(req.user.Id_user)) {
            return res.status(400).send({ message: "Vous ne pouvez pas supprimer votre propre compte" });
        }
        const user = await userService.deleteUser(req.params.id, req.user.email);
        if (!user) return res.status(404).send({ message: "Utilisateur introuvable" });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getAllUser,
    getOneUser,
    createUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    registerFirstUser,
    unlockUser,
    logoutUser,
    getprofile
}