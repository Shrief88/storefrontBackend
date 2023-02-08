import { type QueryResult } from "pg";
import clinet from "../database";
import { type Product } from "./productModel";

export interface Order {
  id?: number;
  status: string;
  user_id: number;
  products: Product[];
}

export interface OrderedProduct {
  id?: number;
  user_id: number;
  product_id: number;
  quantity: number;
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await clinet.connect();
      const sql = "SELECT * FROM orders";
      const res = await clinet.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`could not get orders`);
    }
  }

  async getActiveOrdersByUser(userID: string): Promise<Order[]> {
    try {
      const conn = await clinet.connect();
      const sql = "SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)";
      const res = await clinet.query(sql, [userID, "open"]);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`could not get orders`);
    }
  }

  async getClosedOrdersByUser(userID: string): Promise<Order[]> {
    try {
      const conn = await clinet.connect();
      const sql = "SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)";
      const res = await clinet.query(sql, [userID, "close"]);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`could not get orders`);
    }
  }

  async getOrderProducts(orderID: string): Promise<Product[]> {
    try {
      const conn = await clinet.connect();
      const sql =
        "SELECT name,quantity,price FROM products INNER JOIN ordered_products ON products.id = ordered_products.product_id WHERE order_id=($1)";
      const res: QueryResult<Product> = await conn.query(sql, [orderID]);
      return res.rows;
    } catch (err) {
      throw new Error(`could not get products`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await clinet.connect();
      const sql =
        "INSERT INTO orders (status,user_id) VALUES ($1,$2) RETURNING *";
      const res = await conn.query(sql, [order.status, order.user_id]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`could not create new Order. ${err}`);
    }
  }

  async closeOrder(orderID: number): Promise<Order> {
    try {
      const conn = await clinet.connect();
      const sql = "UPDATE orders SET status=($1) WHERE id=($2)";
      const res = await conn.query(sql, ["close", orderID]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`could not create new Order. ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderID: number,
    productID: number
  ): Promise<OrderedProduct> {
    try {
      const conn = await clinet.connect();
      const sqlOrder = "SELECT * FROM orders WHERE id=($1)";
      const resOrder: QueryResult<Order> = await conn.query(sqlOrder, [
        orderID,
      ]);
      const order = resOrder.rows[0];
      if (order.status !== "open") {
        throw new Error("Order is compelete");
      }
      const sql =
        "INSERT INTO ordered_products (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *";
      const res: QueryResult<OrderedProduct> = await conn.query(sql, [
        orderID,
        productID,
        quantity,
      ]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`could not add product. ${err}`);
    }
  }
}
