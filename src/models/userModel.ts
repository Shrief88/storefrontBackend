import clinet from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export interface User {
  id?: number;
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
      throw new Error(`could not get users. Error: $(err)`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await clinet.connect();
      const sql = "SELECT * FROM users WHERE id = ($1)";
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`could not get user. Error: $(err)`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await clinet.connect();
      const sql =
        "INSERT INTO users (first_name,last_name,password) VALUES ($1,$2,$3) RETURNING *";
      const hash = bcrypt.hashSync(
        user.password + (BCRYPT_PASSWORD as string),
        parseInt(SALT_ROUNDS as string)
      );
      const res = await conn.query(sql, [
        user.first_name,
        user.last_name,
        hash,
      ]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`could not create new user. Error: $(err)`);
    }
  }
}
