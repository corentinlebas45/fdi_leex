"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.updateUser = exports.delUser = exports.createUser = exports.getAllUsers = void 0;
const db_1 = require("../db");
function getAllUsers() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM user`;
        db_1.db.query(query, (error, res) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            else {
                const users = res.map(row => ({
                    id: row.id,
                    username: row.username,
                    password: row.password,
                    role_id: row.role_id
                }));
                resolve(users);
            }
        });
    });
}
exports.getAllUsers = getAllUsers;
function createUser(username, password, role_id) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO user (username, password, role_id) VALUES ('${username}', '${password}', ${role_id});`;
        db_1.db.query(sqlQuery, (error, res) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                const newUser = {
                    id: res[0].insertId,
                    username,
                    password,
                    role_id
                };
                resolve(newUser);
            }
        });
    });
}
exports.createUser = createUser;
function delUser(userId) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM user WHERE id = ${userId};`;
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
exports.delUser = delUser;
function updateUser(userId, username, password, role_id) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE user SET username = '${username}', password = '${password}', role_id = ${role_id} WHERE id = ${userId};`;
        db_1.db.query(sqlQuery, (error, res) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                if (res.changedRows > 0) {
                    const updatedUser = {
                        id: userId,
                        username,
                        password,
                        role_id
                    };
                    resolve(updatedUser);
                }
                else {
                    resolve(null);
                }
            }
        });
    });
}
exports.updateUser = updateUser;
function getUserById(userId) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM user WHERE id = ${userId};`;
        db_1.db.query(sqlQuery, (error, res) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                if (res.length > 0) {
                    const user = {
                        id: res[0].id,
                        username: res[0].username,
                        password: res[0].password,
                        role_id: res[0].role_id
                    };
                    resolve(user);
                }
                else {
                    resolve(null);
                }
            }
        });
    });
}
exports.getUserById = getUserById;
