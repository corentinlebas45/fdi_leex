"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.updateUser = exports.delUser = exports.createUser = exports.getAllUsers = void 0;
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
                    email: row.email,
                    password: row.password,
                    role: row.role
                }));
                resolve(users);
            }
        });
    });
}
exports.getAllUsers = getAllUsers;
function createUser(email, password) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO user (email, password, roles) VALUES ('${email}', '${password}', '["ROLE_USER"]');`;
        db_1.db.query(sqlQuery, (error, res) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                db_1.db.query(`SELECT * FROM user WHERE email = ${email}`, (error, res) => {
                    const users = res.map(row => ({
                        id: row.id,
                        email: row.email,
                        password: row.password,
                        role: row.role
                    }));
                    resolve(users[0]);
                });
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
function updateUser(userId, email, password, role) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE user SET email = '${email}', password = '${password}', role = ${role} WHERE id = ${userId};`;
        db_1.db.query(sqlQuery, (error, res) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                if (res.changedRows > 0) {
                    const updatedUser = {
                        id: userId,
                        email,
                        password,
                        role
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
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM user WHERE email = ${email};`;
        db_1.db.query(sqlQuery, (error, res) => {
            if (error) {
                console.error(error);
                reject(error);
            }
            else {
                if (res.length > 0) {
                    const user = {
                        id: res[0].id,
                        email: res[0].email,
                        password: res[0].password,
                        role: res[0].role
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
exports.getUserByEmail = getUserByEmail;
