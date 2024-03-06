import express from 'express';
import * as productController from "../controllers/ProductController";

const router = express.Router();

router.get('/', productController.getAllProductsController);

router.get('/:id', productController.getProductByIdController);

router.post('/', productController.addNewProductController);

router.delete('/:id', productController.delProductController);

router.put('/:id', productController.updateProductController);

export default router;
