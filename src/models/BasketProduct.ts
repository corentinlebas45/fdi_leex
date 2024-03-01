import { db } from "../db";
import { RowDataPacket } from "mysql2";

export interface BasketProduct {
    id: number;
    basket_id: number;
    product_id: number;
    qte: number;
}

export function getAllBasketProducts(): Promise<BasketProduct[]> {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM basket_product`;

        db.query(query, (error: any, res: RowDataPacket[]) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
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


export function addNewBasketProduct(basket_id: number, product_id: number, qte: number): Promise<BasketProduct> {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO basket_product (basket_id, product_id, qte) VALUES (${basket_id}, ${product_id}, ${qte});`;

        db.query(sqlQuery, (error: any, res: RowDataPacket[]) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
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


export function delBasketProduct(basketProductId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM basket_product WHERE id = ${basketProductId};`;

        db.query(sqlQuery, (error: any, res: RowDataPacket[]) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
}

export function updateBasketProduct(basketProductId: number, qte: number): Promise<BasketProduct | null> {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE basket_product SET qte = ${qte} WHERE id = ${basketProductId};`;

        db.query(sqlQuery, (error: any, res: any) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                if (res.changedRows > 0) {
                    const updatedBasketProduct = {
                        id: basketProductId,
                        basket_id: res.basket_id, 
                        product_id: res.product_id, 
                        qte
                    };
                    resolve(updatedBasketProduct);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

export function getBasketProductById(basketProductId: number): Promise<BasketProduct | null> {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM basket_product WHERE id = ${basketProductId};`;

        db.query(sqlQuery, (error: any, res: RowDataPacket[]) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                if (res.length > 0) {
                    const basketProduct = {
                        id: res[0].id,
                        basket_id: res[0].basket_id,
                        product_id: res[0].product_id,
                        qte: res[0].qte
                    };
                    resolve(basketProduct);
                } else {
                    resolve(null);
                }
            }
        });
    });
}