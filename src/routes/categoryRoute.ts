import express from 'express';
import * as categoryController from "../controllers/CategoryController";

const router = express.Router();

router.get('/', categoryController.getAllCategoryController);

router.get('/:id', categoryController.getCategoryByIdController);

router.post('/', categoryController.addNewCategoryController);

router.delete('/:id', categoryController.delCategoryController);

router.put('/:id', categoryController.updateCategoryController);

export default router;
