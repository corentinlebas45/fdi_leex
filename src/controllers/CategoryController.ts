import { Request, Response } from 'express';
import { getAllCategory, addNewCategory, delCategory, updateCategory, getCategoryById } from '../models/Category';


const getAllCategoryController = async (req: Request, res: Response) => {
    try {
        const categorys = await getAllCategory();
        res.json(categorys);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la sélection des categorys.' });
    }
}


const addNewCategoryController = async (req: Request, res: Response) => {
    const { label } = req.body;
    try {
        const newCategory = await addNewCategory(label);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création d\'une nouvelle category.' });
    }
};


const delCategoryController = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);
    try {
        const result = await delCategory(categoryId);
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Category non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la category.' });
    }
};


const updateCategoryController = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);
    const { label } = req.body;
    try {
        const updatedCategory = await updateCategory(categoryId, label);
        if (updatedCategory) {
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la category.' });
    }
}


const getCategoryByIdController = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);
    try {
        const category = await getCategoryById(categoryId);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la sélection de la category.' });
    }
}


export {
    getAllCategoryController,
    addNewCategoryController,
    delCategoryController,
    updateCategoryController,
    getCategoryByIdController
}