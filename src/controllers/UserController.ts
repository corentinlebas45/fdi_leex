
import express, { Request, Response } from 'express';
import { getAllUsers, createUser, delUser, updateUser, getUserByEmail } from '../models/User';

const createUserController = async (req: Request, res: Response) => {
    console.log(req.body);
    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }
    const email = req.body.email;
    const password = req.body.password;
    try {
        const newUser = await createUser(email, password);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création d\'un nouvel utilisateur.' });
    }
};

const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
}


const delUserController = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        const result = await delUser(userId);
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
    }
}


const updateUserController = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const { email, password, role_id } = req.body;
    try {
        const updatedUser = await updateUser(userId, email, password, role_id);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
    }
}

const getUserByEmailController = async (req: Request, res: Response) => {
    const email = req.params.email;
    try {
        const user = await getUserByEmail(email);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la recherche de l\'utilisateur.' });
    }
}

export {createUserController, getAllUsersController, delUserController, updateUserController, getUserByEmailController}