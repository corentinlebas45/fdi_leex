"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
exports.createUser = async (req, res) => {
    const { username, password, role_id } = req.body;
    try {
        const newUser = await (0, User_1.createUser)(username, password, role_id);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création d\'un nouvel utilisateur.' });
    }
};
exports.getAllUsers = async (req, res) => {
    try {
        const users = await (0, User_1.getAllUsers)();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
};
exports.delUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const result = await (0, User_1.delUser)(userId);
        if (result) {
            res.status(204).end();
        }
        else {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
    }
};
exports.updateUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    const { username, password, role_id } = req.body;
    try {
        const updatedUser = await (0, User_1.updateUser)(userId, username, password, role_id);
        if (updatedUser) {
            res.json(updatedUser);
        }
        else {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
    }
};
exports.getUserById = async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const user = await (0, User_1.getUserById)(userId);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la recherche de l\'utilisateur.' });
    }
};
