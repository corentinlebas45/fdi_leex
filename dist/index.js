"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const mysql_1 = __importDefault(require("mysql"));
var { expressjwt: jwt } = require("express-jwt");
const secret = 'cle_secrete_de_fou';
const app = (0, express_1.default)();
const port = 3000;
const db = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'etna',
    password: 'password',
    database: 'api_fdi',
});
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});
app.use(jwt({ secret, algorithms: ['HS256'] }).unless({ path: ['/login'] }));
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: 'Token JWT invalide' });
    }
    else {
        next();
    }
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
    res.json({ token });
});
app.use('/api/users', userRoute_1.default);
app.use('/api/products', productRoute_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
