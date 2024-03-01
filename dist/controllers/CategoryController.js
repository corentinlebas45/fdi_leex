"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryByIdController = exports.updateCategoryController = exports.delCategoryController = exports.addNewCategoryController = exports.getAllCategoryController = void 0;
const Category_1 = require("../models/Category");
const getAllCategoryController = async (req, res) => {
    try {
        const categorys = await (0, Category_1.getAllCategory)();
        res.json(categorys);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la sélection des categorys.' });
    }
};
exports.getAllCategoryController = getAllCategoryController;
const addNewCategoryController = async (req, res) => {
    const { label } = req.body;
    try {
        const newCategory = await (0, Category_1.addNewCategory)(label);
        res.status(201).json(newCategory);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création d\'une nouvelle category.' });
    }
};
exports.addNewCategoryController = addNewCategoryController;
const delCategoryController = async (req, res) => {
    const categoryId = parseInt(req.params.id);
    try {
        const result = await (0, Category_1.delCategory)(categoryId);
        if (result) {
            res.status(204).end();
        }
        else {
            res.status(404).json({ message: 'Category non trouvé.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la category.' });
    }
};
exports.delCategoryController = delCategoryController;
const updateCategoryController = async (req, res) => {
    const categoryId = parseInt(req.params.id);
    const { label } = req.body;
    try {
        const updatedCategory = await (0, Category_1.updateCategory)(categoryId, label);
        if (updatedCategory) {
            res.json(updatedCategory);
        }
        else {
            res.status(404).json({ message: 'Category non trouvé.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la category.' });
    }
};
exports.updateCategoryController = updateCategoryController;
const getCategoryByIdController = async (req, res) => {
    const categoryId = parseInt(req.params.id);
    try {
        const category = await (0, Category_1.getCategoryById)(categoryId);
        if (category) {
            res.json(category);
        }
        else {
            res.status(404).json({ message: 'Category non trouvé.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la sélection de la category.' });
    }
};
exports.getCategoryByIdController = getCategoryByIdController;
