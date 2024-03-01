import { db } from "../db";
import { RowDataPacket } from "mysql2";

export interface Product {
  category_id: number;
  label: string;
  qte: number;
  image: string | null;
  description: string;
  price: number;
}

export function getAllProducts(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM product`;

    db.query(query, (error:any, res: RowDataPacket[]) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        const products = res.map(row => ({
          id: row.id,
          category_id: row.category_id,
          label: row.label,
          qte: row.qte,
          image: row.image,
          description: row.description,
          price: row.price
        }));
        resolve(products);
      }
    });
  });
}

export function addNewProduct(category_id: number, label: string, qte: number, image: string, description: string, price: number): Promise<Product> {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO product (category_id, label, qte, image, description, price) VALUES (${category_id}, '${label}', ${qte}, '${image}', '${description}', ${price});`;

    db.query(sqlQuery, (error: any, res: RowDataPacket[]) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        const newProduct = {
          category_id,
          label,
          qte,
          image,
          description,
          price
        };
        resolve(newProduct);
      }
    });
  });
}

export function updateProduct(productId: number, category_id: number, label: string, qte: number, image: string, description: string, price: number): Promise<Product | null> {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE product SET category_id = ${category_id}, label = '${label}', qte = ${qte}, image = '${image}', description = '${description}', price = ${price} WHERE id = ${productId};`;

    db.query(sqlQuery, (error: any, res: any) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        if (res.changedRows > 0) {
          const updatedProduct = {
            id: productId,
            category_id,
            label,
            qte,
            image,
            description,
            price
          };
          resolve(updatedProduct);
        } else {
          resolve(null);
        }
      }
    });
  });
}

export function delProduct(productId: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const sqlQuery = `DELETE FROM product WHERE id = ${productId};`;

    db.query(sqlQuery, (error: any, res: any) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

export function getProductById(productId: number): Promise<Product | null> {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM product WHERE id = ${productId};`;
      
  })
}
