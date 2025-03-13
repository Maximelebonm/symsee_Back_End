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
        res.send("ok");
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req);
        const token = security.generateToken(newUser);
        res.cookie('auth', token, cookieConfig);
        res.status(201).send(newUser);
    }
    catch (error) {
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
        if(findUser){
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

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('auth');
        res.status(200).send({ message: 'User logged out' });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req);
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req);
        res.status(200).send(user);
    }
    catch (error) {
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
    registerFirstUser

}