const appelDoffreService = require('../services/appelDoffre.service');

const getAllAppelDoffres = async (req, res) => {
    try {
        const appelDoffres = await appelDoffreService.getAllAppelDoffres();
        res.status(200).send(appelDoffres);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getOneAppelDoffre = async (req, res) => {
    try {
        const appelDoffre = await appelDoffreService.getOneAppelDoffre(req.params.id);
        if(appelDoffre) {
        res.send("ok");
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const createAppelDoffre = async (req, res) => {
    try {
        const newAppelDoffre = await appelDoffreService.createAppelDoffre(req);
        res.status(201).send(newAppelDoffre);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updateAppelDoffre = async (req, res) => {
    try {
        const appelDoffre = await appelDoffreService.updateAppelDoffre(req);
        res.status(200).send(appelDoffre);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const deleteAppelDoffre = async (req, res) => {
    try {
        const appelDoffre = await appelDoffreService.deleteAppelDoffre(req);
        res.status(200).send(appelDoffre);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = { getAllAppelDoffres, getOneAppelDoffre, createAppelDoffre, updateAppelDoffre, deleteAppelDoffre }