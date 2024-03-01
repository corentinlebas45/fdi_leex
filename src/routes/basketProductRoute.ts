import express from 'express';
import * as basketController from "../controllers/BasketProductController";


const router = express.Router();

router.get('/', basketController.getAllBasketProductController);

router.post('/', basketController.addNewBasketProductController);

router.delete('/:id', basketController.delBasketProductController);

router.put('/:id', basketController.updateBasketProductController);

router.get('/:id', basketController.getBasketProductByIdController);

export default router