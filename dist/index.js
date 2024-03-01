"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const basketProductRoute_1 = __importDefault(require("./routes/basketProductRoute"));
const body_parser_1 = __importDefault(require("body-parser"));
const mysql_1 = __importDefault(require("mysql"));
const app = (0, express_1.default)();
const port = 3000;
function generateSecretToken() {
    const token = require('crypto').randomBytes(64).toString('hex');
    process.env.TOKEN_SECRET = token;
}
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
const jsonParser = body_parser_1.default.json();
const urlencodedParser = body_parser_1.default.urlencoded({ extended: true });
app.use(jsonParser);
app.use(urlencodedParser);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/users', userRoute_1.default);
app.use('/api/products', productRoute_1.default);
app.use('/api/basket', basketProductRoute_1.default);
app.use('/api/category', categoryRoute_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
