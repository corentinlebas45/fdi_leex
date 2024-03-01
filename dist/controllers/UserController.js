"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmailController = exports.updateUserController = exports.delUserController = exports.getAllUsersController = exports.createUserController = void 0;
const User_1 = require("../models/User");
const createUserController = async (req, res) => {
    console.log(req.body);
    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }
    const email = req.body.email;
    const password = req.body.password;
    try {
        const newUser = await (0, User_1.createUser)(email, password);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création d\'un nouvel utilisateur.' });
    }
};
exports.createUserController = createUserController;
const getAllUsersController = async (req, res) => {
    try {
        const users = await (0, User_1.getAllUsers)();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
};
exports.getAllUsersController = getAllUsersController;
const delUserController = async (req, res) => {
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
exports.delUserController = delUserController;
const updateUserController = async (req, res) => {
    const userId = parseInt(req.params.id);
    const { email, password, role_id } = req.body;
    try {
        const updatedUser = await (0, User_1.updateUser)(userId, email, password, role_id);
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
exports.updateUserController = updateUserController;
const getUserByEmailController = async (req, res) => {
    const email = req.params.email;
    try {
        const user = await (0, User_1.getUserByEmail)(email);
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
exports.getUserByEmailController = getUserByEmailController;
