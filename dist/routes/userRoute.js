"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController = require("../controllers/UserController");
const router = express_1.default.Router();
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.delete('/:id', userController.delUser);
router.put('/:id', userController.updateUser);
router.get('/:id', userController.getUserById);
exports.default = router;
