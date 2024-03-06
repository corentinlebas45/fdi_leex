
import { Request, Response } from 'express';
import { getAllUsers, createUser, delUser, updateUser, getUserByEmail, loginCheck, User } from '../models/User';
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
dotenv.config();


function generateAccessToken(user: User){
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

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

const loginUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const check: boolean = await loginCheck(email, password);
        console.log(check);
        if (check) {
            const user: User|null = await getUserByEmail(email);
            if(user){
                const token = generateAccessToken(user);
                res.json({ "token": token });
            }else{
                res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
            }
        } else {
            res.status(401).json({ message: 'Email ou mot de passe incorrect.' });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la tentative de connexion.' });
    }
}

export {createUserController, getAllUsersController, delUserController, updateUserController, getUserByEmailController, loginUserController}