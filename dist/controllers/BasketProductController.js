"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBasketProductByIdController = exports.updateBasketProductController = exports.delBasketProductController = exports.addNewBasketProductController = exports.getAllBasketProductController = void 0;
const BasketProduct_1 = require("../models/BasketProduct");
const getAllBasketProductController = async (req, res) => {
    try {
        const basketProducts = await (0, BasketProduct_1.getAllBasketProducts)();
        res.json(basketProducts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la sélection des basketProducts.' });
    }
};
exports.getAllBasketProductController = getAllBasketProductController;
const addNewBasketProductController = async (req, res) => {
    const { basket_id, product_id, qte } = req.body;
    try {
        const newBasketProduct = await (0, BasketProduct_1.addNewBasketProduct)(basket_id, product_id, qte);
        res.status(201).json(newBasketProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création d\'un nouveau basketProduct.' });
    }
};
exports.addNewBasketProductController = addNewBasketProductController;
const delBasketProductController = async (req, res) => {
    const basketProductId = parseInt(req.params.id);
    try {
        const result = await (0, BasketProduct_1.delBasketProduct)(basketProductId);
        if (result) {
            res.status(204).end();
        }
        else {
            res.status(404).json({ message: 'BasketProduct non trouvé.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du basketProduct.' });
    }
};
exports.delBasketProductController = delBasketProductController;
const updateBasketProductController = async (req, res) => {
    const basketProductId = parseInt(req.params.id);
    const { qte } = req.body;
    try {
        const updatedBasketProduct = await (0, BasketProduct_1.updateBasketProduct)(basketProductId, qte);
        if (updatedBasketProduct) {
            res.json(updatedBasketProduct);
        }
        else {
            res.status(404).json({ message: 'BasketProduct non trouvé.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du basketProduct.' });
    }
};
exports.updateBasketProductController = updateBasketProductController;
const getBasketProductByIdController = async (req, res) => {
    const basketProductId = parseInt(req.params.id);
    try {
        const basketProduct = await (0, BasketProduct_1.getBasketProductById)(basketProductId);
        if (basketProduct) {
            res.json(basketProduct);
        }
        else {
            res.status(404).json({ message: 'BasketProduct non trouvé.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la sélection du basketProduct.' });
    }
};
exports.getBasketProductByIdController = getBasketProductByIdController;
