import express, { Request, Response } from 'express';
import { getAllProducts, addNewProduct, delProduct, updateProduct, getProductById } from '../models/Product';


const getAllProductsController = async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la sélection des produits.' });
    }
}



const addNewProductController = async (req: Request, res: Response) => {
    const { category_id, label, qte, image, description, price } = req.body;
    try {
        const newProduct = await addNewProduct(category_id, label, qte, image, description, price);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création d\'un nouveau produit.' });
    }
};


const delProductController = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    try {
        const result = await delProduct(productId);
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Produit non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du produit.' });
    }
};


const updateProductController = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    const { category_id, label, qte, image, description, price } = req.body;
    try {
        const updatedProduct = await updateProduct(productId, category_id, label, qte, image, description, price);
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Produit non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du produit.' });
    }
}

const getProductByIdController = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    try {
        const product = await getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Produit non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la sélection du produit.' });
    }
}

export {
    getAllProductsController,
    addNewProductController,
    delProductController,
    updateProductController,
    getProductByIdController
}