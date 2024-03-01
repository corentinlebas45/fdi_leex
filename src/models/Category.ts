import { db } from "../db";
import { RowDataPacket } from "mysql2";

export interface Category {
    id: number;
    label: string;
}

export function getAllCategory(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM category`;

        db.query(query, (error: any, res: RowDataPacket[]) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                const categorys = res.map(row => ({
                    id: row.id,
                    label: row.label
                }));
                resolve(categorys);
            }
        });
    });
}

export function addNewCategory(label: string): Promise<Category> {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO category (label) VALUES ('${label}');`;

        db.query(sqlQuery, (error: any, res: RowDataPacket[]) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                const newCategory = {
                    id: res[0].insertId,
                    label
                };
                resolve(newCategory);
            }
        });
    });
}


export function delCategory(categoryId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM category WHERE id = ${categoryId};`;

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


export function updateCategory(categoryId: number, label: string): Promise<Category> {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE category SET label = '${label}' WHERE id = ${categoryId};`;

        db.query(sqlQuery, (error: any, res: RowDataPacket[]) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                const updatedCategory = {
                    id: categoryId,
                    label
                };
                resolve(updatedCategory);
            }
        });
    });
}


export function getCategoryById(categoryId: number): Promise<Category | null> {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM category WHERE id = ${categoryId}`;

        db.query(sqlQuery, (error: any, res: RowDataPacket[]) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                if (res.length > 0) {
                    const category = {
                        id: res[0].id,
                        label: res[0].label
                    };
                    resolve(category);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

