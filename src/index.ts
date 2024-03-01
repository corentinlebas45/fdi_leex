import express, { NextFunction, Request, Response } from 'express';
import {getUserByEmail} from './models/User';
import userRoutes from './routes/userRoute';
import productRoutes from './routes/productRoute';
import categoryRoutes from './routes/categoryRoute';
import basketProductRoutes from './routes/BasketProductRoute';
import bodyParser from "body-parser";
import mysql, { MysqlError } from 'mysql';
const jwt = require('jsonwebtoken')

const secret = 'cle_secrete_de_fou'; 
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'etna',
  password: 'password',
  database: 'api_fdi',
});

db.connect((err: MysqlError) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});


// app.use(jwt({ secret, algorithms: ['HS256'] }).unless({ path: ['/login'] }));
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(jsonParser);
app.use(urlencodedParser);




app.post('/login', (req : Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  next();
})


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/basket', basketProductRoutes);
app.use('/api/category', categoryRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
