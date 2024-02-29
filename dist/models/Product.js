"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.delProduct = exports.updateProduct = exports.addNewProduct = exports.getAllProducts = void 0;
const db_1 = require("../db");
function getAllProducts() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM product`;
        db_1.db.query(query, (error, res) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            else {
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
exports.getAllProducts = getAllProducts;
function addNewProduct(category_id, label, qte, image, description, price) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO product (category_id, label, qte, image, description, price) VALUES (${category_id}, '${label}', ${qte}, '${image}', '${description}', ${price});`;
        db_1.db.query(sqlQuery, (error, res) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                const newProduct = {
                    id: res[0].insertId,
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
exports.addNewProduct = addNewProduct;
function updateProduct(productId, category_id, label, qte, image, description, price) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE product SET category_id = ${category_id}, label = '${label}', qte = ${qte}, image = '${image}', description = '${description}', price = ${price} WHERE id = ${productId};`;
        db_1.db.query(sqlQuery, (error, res) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
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
                }
                else {
                    resolve(null);
                }
            }
        });
    });
}
exports.updateProduct = updateProduct;
function delProduct(productId) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM product WHERE id = ${productId};`;
        db_1.db.query(sqlQuery, (error, res) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                resolve(true);
            }
        });
    });
}
exports.delProduct = delProduct;
function getProductById(productId) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM product WHERE id = ${productId};`;
    });
}
exports.getProductById = getProductById;
