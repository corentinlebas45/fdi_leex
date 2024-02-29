"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController = require("../controllers/ProductController");
const router = express_1.default.Router();
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductByIdController);
router.post('/', productController.addNewProduct);
router.delete('/:id', productController.delProduct);
router.put('/:id', productController.updateProduct);
exports.default = router;
