"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
exports.getAllProducts = async (req, res) => {
    try {
        const products = await (0, Product_1.getAllProducts)();
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la sélection des produits.' });
    }
};
exports.addNewProduct = async (req, res) => {
    const { category_id, label, qte, image, description, price } = req.body;
    try {
        const newProduct = await (0, Product_1.addNewProduct)(category_id, label, qte, image, description, price);
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création d\'un nouveau produit.' });
    }
};
exports.delProduct = async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const result = await (0, Product_1.delProduct)(productId);
        if (result) {
            res.status(204).end();
        }
        else {
            res.status(404).json({ message: 'Produit non trouvé.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du produit.' });
    }
};
exports.updateProduct = async (req, res) => {
    const productId = parseInt(req.params.id);
    const { category_id, label, qte, image, description, price } = req.body;
    try {
        const updatedProduct = await (0, Product_1.updateProduct)(productId, category_id, label, qte, image, description, price);
        if (updatedProduct) {
            res.json(updatedProduct);
        }
        else {
            res.status(404).json({ message: 'Produit non trouvé.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du produit.' });
    }
};
