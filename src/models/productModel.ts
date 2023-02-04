import { type QueryResult } from "pg";
import clinet from "../database";

export interface Product {
  id?: number;
  name: string;
  price: number;
  category?: string;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await clinet.connect();
      const sql = "SELECT * FROM products";
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`could not get products`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await clinet.connect();
      const sql = "SELECT * FROM products WHERE id = ($1)";
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

//   async create(product: Product): Promise<Product> {
//     try {
//       const conn = await clinet.connect();
//       let sql: string = "SELECT * FROM products WHERE name=$1";
//       let res: QueryResult<Product> = await conn.query(sql, [product.name]);
//       if (res.rowCount !== 0) {
//         throw new Error("product is already exist!");
//       }
//       sql =
//         "INSERT INTO users (email,first_name,last_name,password) VALUES ($1,$2,$3,$4) RETURNING *"
//       res = await conn.query(sql, [
//         product.
//       ]);
//       conn.release();
//       return res.rows[0];
//     } catch (err) {
//       throw new Error(`could not create new user. ${err}`);
//     }
//   }
}
