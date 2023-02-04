import clinet from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { type QueryResult } from "pg";

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export interface User {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await clinet.connect();
      const sql = "SELECT * FROM users";
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`could not get users`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await clinet.connect();
      const sql = "SELECT * FROM users WHERE id = ($1)";
      const res = await conn.query(sql, [id]);
      conn.release();

      if (res.rowCount === 0) {
        throw new Error("you should provide existing id");
      }
      return res.rows[0];
    } catch (err) {
      throw new Error(`could not get user, ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await clinet.connect();
      let sql: string = "SELECT * FROM users WHERE email=$1";
      let res: QueryResult<User> = await conn.query(sql, [user.email]);
      if (res.rowCount !== 0) {
        throw new Error("email is already used!");
      }
      sql =
        "INSERT INTO users (email,first_name,last_name,password) VALUES ($1,$2,$3,$4) RETURNING *";
      const hash = bcrypt.hashSync(
        user.password + (BCRYPT_PASSWORD as string),
        parseInt(SALT_ROUNDS as string)
      );
      res = await conn.query(sql, [
        user.email,
        user.first_name,
        user.last_name,
        hash,
      ]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`could not create new user. ${err}`);
    }
  }
}
