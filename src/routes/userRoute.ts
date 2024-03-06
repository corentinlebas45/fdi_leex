import express from 'express';
import * as userController from "../controllers/UserController";

const router = express.Router();

router.get('/', userController.getAllUsersController);

router.post('/', userController.createUserController);

router.delete('/:id', userController.delUserController);

router.put('/:id', userController.updateUserController);

router.get('/:id', userController.getUserByEmailController);

router.post('/login', userController.loginUserController);

export default router;
 