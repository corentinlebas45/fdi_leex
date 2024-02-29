"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const router = express_1.default.Router();
router.get('/users', async (req, res) => {
    const users = await (0, User_1.getAllUsers)();
    res.json(users);
});
// router.get('/users/:id', async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id, 10);
//   const user = await getUserById(id);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ error: 'User not found' });
//   }
// });
router.post('/users', async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        res.status(400).json({ error: 'Name and password required' });
        return;
    }
    const user = await (0, User_1.addNewUser)(name, password);
    res.status(201).json(user);
});
// router.put('/users/:id', async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id, 10);
//   const { name } = req.body;
//   if (!name) {
//     res.status(400).json({ error: 'Name is required' });
//     return;
//   }
//   const user = await updateUser(id, name);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ error: 'User not found' });
//   }
// });
router.delete('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    await (0, User_1.delUser)(id);
});
exports.default = router;
