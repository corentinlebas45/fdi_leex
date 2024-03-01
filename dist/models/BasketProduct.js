"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBasketProductById = exports.updateBasketProduct = exports.delBasketProduct = exports.addNewBasketProduct = exports.getAllBasketProducts = void 0;
const db_1 = require("../db");
function getAllBasketProducts() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM basket_product`;
        db_1.db.query(query, (error, res) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            else {
                const basketProducts = res.map(row => ({
                    id: row.id,
                    basket_id: row.basket_id,
                    product_id: row.product_id,
                    qte: row.qte
                }));
                resolve(basketProducts);
            }
        });
    });
}
exports.getAllBasketProducts = getAllBasketProducts;
function addNewBasketProduct(basket_id, product_id, qte) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO basket_product (basket_id, product_id, qte) VALUES (${basket_id}, ${product_id}, ${qte});`;
        db_1.db.query(sqlQuery, (error, res) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                const newBasketProduct = {
                    id: res[0].insertId,
                    basket_id,
                    product_id,
                    qte
                };
                resolve(newBasketProduct);
            }
        });
    });
}
exports.addNewBasketProduct = addNewBasketProduct;
function delBasketProduct(basketProductId) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM basket_product WHERE id = ${basketProductId};`;
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
exports.delBasketProduct = delBasketProduct;
function updateBasketProduct(basketProductId, qte) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE basket_product SET qte = ${qte} WHERE id = ${basketProductId};`;
        db_1.db.query(sqlQuery, (error, res) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                if (res.changedRows > 0) {
                    const updatedBasketProduct = {
                        id: basketProductId,
                        basket_id: res.basket_id,
                        product_id: res.product_id,
                        qte
                    };
                    resolve(updatedBasketProduct);
                }
                else {
                    resolve(null);
                }
            }
        });
    });
}
exports.updateBasketProduct = updateBasketProduct;
function getBasketProductById(basketProductId) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM basket_product WHERE id = ${basketProductId};`;
        db_1.db.query(sqlQuery, (error, res) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                if (res.length > 0) {
                    const basketProduct = {
                        id: res[0].id,
                        basket_id: res[0].basket_id,
                        product_id: res[0].product_id,
                        qte: res[0].qte
                    };
                    resolve(basketProduct);
                }
                else {
                    resolve(null);
                }
            }
        });
    });
}
exports.getBasketProductById = getBasketProductById;
