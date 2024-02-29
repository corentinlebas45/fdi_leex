import { db } from "../db";
import { RowDataPacket } from "mysql2";

export interface User {
  email: string;
  password: string;
}

export function getAllUsers(): Promise<User[]> {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM user`;

    db.query(query, (error: any, res: RowDataPacket[]) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
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

export function createUser(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO user (email, password) VALUES ('${email}', '${password}');`;

    db.query(sqlQuery, (error: any, res: RowDataPacket[]) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        const newUser = {
          email,
          password,
        };
        resolve(newUser);
      }
    });
  });
}

export function delUser(userId: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const sqlQuery = `DELETE FROM user WHERE id = ${userId};`;

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

export function updateUser(userId: number, email: string, password: string, role: number): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE user SET email = '${email}', password = '${password}', role = ${role} WHERE id = ${userId};`;

    db.query(sqlQuery, (error: any, res: any) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        if (res.changedRows > 0) {
          const updatedUser = {
            id: userId,
            email,
            password,
            role
          };
          resolve(updatedUser);
        } else {
          resolve(null);
        }
      }
    });
  });
}

export function getUserByEmail(email: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM user WHERE email = ${email};`;
    db.query(sqlQuery, (error: any, res: RowDataPacket[]) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        if (res.length > 0) {
          const user = {
            id: res[0].id,
            email: res[0].email,
            password: res[0].password,
            role: res[0].role
          };
          resolve(user);
        } else {
          resolve(null);
        }
      }
    });
  });
}