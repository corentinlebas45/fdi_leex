"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryById = exports.updateCategory = exports.delCategory = exports.addNewCategory = exports.getAllCategory = void 0;
const db_1 = require("../db");
function getAllCategory() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM category`;
        db_1.db.query(query, (error, res) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            else {
                const categorys = res.map(row => ({
                    id: row.id,
                    label: row.label
                }));
                resolve(categorys);
            }
        });
    });
}
exports.getAllCategory = getAllCategory;
function addNewCategory(label) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO category (label) VALUES ('${label}');`;
        db_1.db.query(sqlQuery, (error, res) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                const newCategory = {
                    id: res[0].insertId,
                    label
                };
                resolve(newCategory);
            }
        });
    });
}
exports.addNewCategory = addNewCategory;
function delCategory(categoryId) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM category WHERE id = ${categoryId};`;
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
exports.delCategory = delCategory;
function updateCategory(categoryId, label) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE category SET label = '${label}' WHERE id = ${categoryId};`;
        db_1.db.query(sqlQuery, (error, res) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                const updatedCategory = {
                    id: categoryId,
                    label
                };
                resolve(updatedCategory);
            }
        });
    });
}
exports.updateCategory = updateCategory;
function getCategoryById(categoryId) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM category WHERE id = ${categoryId}`;
        db_1.db.query(sqlQuery, (error, res) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                if (res.length > 0) {
                    const category = {
                        id: res[0].id,
                        label: res[0].label
                    };
                    resolve(category);
                }
                else {
                    resolve(null);
                }
            }
        });
    });
}
exports.getCategoryById = getCategoryById;
