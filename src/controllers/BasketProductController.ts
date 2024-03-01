import { Request, Response } from 'express';
import { getAllBasketProducts, addNewBasketProduct, delBasketProduct, updateBasketProduct, getBasketProductById } from '../models/BasketProduct';


const getAllBasketProductController = async (req: Request, res: Response) => {
    try {
        const basketProducts = await getAllBasketProducts();
        res.json(basketProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la sélection des basketProducts.' });
    }
}


const addNewBasketProductController = async (req: Request, res: Response) => {
    const { basket_id, product_id, qte } = req.body;
    try {
        const newBasketProduct = await addNewBasketProduct(basket_id, product_id, qte);
        res.status(201).json(newBasketProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création d\'un nouveau basketProduct.' });
    }
};


const delBasketProductController = async (req: Request, res: Response) => {
    const basketProductId = parseInt(req.params.id);
    try {
        const result = await delBasketProduct(basketProductId);
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'BasketProduct non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du basketProduct.' });
    }
};


const updateBasketProductController = async (req: Request, res: Response) => {
    const basketProductId = parseInt(req.params.id);
    const { qte } = req.body;
    try {
        const updatedBasketProduct = await updateBasketProduct(basketProductId, qte);
        if (updatedBasketProduct) {
            res.json(updatedBasketProduct);
        } else {
            res.status(404).json({ message: 'BasketProduct non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du basketProduct.' });
    }
}


const getBasketProductByIdController = async (req: Request, res: Response) => {
    const basketProductId = parseInt(req.params.id);
    try {
        const basketProduct = await getBasketProductById(basketProductId);
        if (basketProduct) {
            res.json(basketProduct);
        } else {
            res.status(404).json({ message: 'BasketProduct non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la sélection du basketProduct.' });
    }
}


export {
    getAllBasketProductController,
    addNewBasketProductController,
    delBasketProductController,
    updateBasketProductController,
    getBasketProductByIdController
}