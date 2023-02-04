import { type QueryResult } from "pg";
import clinet from "../database";

export interface Product {
  id?: number;
  name: string;
  price: number;
  category: string;
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
      throw new Error(`could not get product, ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn = await clinet.connect();
      let sql: string = "SELECT * FROM products WHERE name=$1";
      let res: QueryResult<Product> = await conn.query(sql, [product.name]);
      if (res.rowCount !== 0) {
        throw new Error("product is already exist!");
      }
      sql =
        "INSERT INTO products (name,price,category) VALUES ($1,$2,$3) RETURNING *";
      res = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`could not create new product. ${err}`);
    }
  }

  async getOrderByCategory(category: string): Promise<Product[]> {
    try {
      const conn = await clinet.connect();
      const sql = "SELECT * FROM products WHERE category=($1)";
      const res = await conn.query(sql, [category]);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`could not get products. ${err}`);
    }
  }
}
