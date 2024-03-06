import express from 'express';
import userRoutes from './routes/userRoute';
import productRoutes from './routes/productRoute';
import categoryRoutes from './routes/categoryRoute';
import basketRoutes from './routes/basketProductRoute';
import mysql, { MysqlError } from 'mysql';

const app = express();
const port = 3000;

function generateSecretToken(){
  const token = require('crypto').randomBytes(64).toString('hex');
  process.env.TOKEN_SECRET = token;
}

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


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/basket', basketRoutes);
app.use('/api/category', categoryRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
