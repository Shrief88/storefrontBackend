import { type QueryResult } from "pg";
import client from "../database";

export interface Order {
  id?: number;
  status: string;
  user_id: number;
}

export interface OrderedProduct {
  id?: number;
  user_id: number;
  product_id: number;
  quantity: number;
}

export interface OrderedProductInfo {
  name: string;
  quantity: number;
  price: number;
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const res = await client.query(sql);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`could not get orders`);
    }
  }

  async getActiveOrdersByUser(userID: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sqlUsers = "SELECT * FROM users WHERE id=($1)";
      const users = await conn.query(sqlUsers, [userID]);
      if (users.rowCount === 0) {
        throw new Error("you should provide existing user_id");
      }
      const sql = "SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)";
      const res = await client.query(sql, [userID, "open"]);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`could not get orders, ${err}`);
    }
  }

  async getClosedOrdersByUser(userID: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sqlUsers = "SELECT * FROM users WHERE id=($1)";
      const users = await conn.query(sqlUsers, [userID]);
      if (users.rowCount === 0) {
        throw new Error("you should provide existing user_id");
      }
      const sql = "SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)";
      const res = await client.query(sql, [userID, "close"]);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`could not get orders, ${err}`);
    }
  }

  async getOrderProducts(orderID: number): Promise<OrderedProductInfo[]> {
    try {
      const conn = await client.connect();
      const sqlOrders = "SELECT * FROM orders WHERE id=($1)";
      const orders = await conn.query(sqlOrders, [orderID]);
      if (orders.rowCount === 0) {
        throw new Error("you should provide existing order_id");
      }
      const sql =
        "SELECT name,quantity,price FROM products INNER JOIN ordered_products ON products.id = ordered_products.product_id WHERE order_id=($1)";
      const res: QueryResult<OrderedProductInfo> = await conn.query(sql, [
        orderID,
      ]);
      return res.rows;
    } catch (err) {
      throw new Error(`could not get products, ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
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
      const conn = await client.connect();
      const sqlOrder = "SELECT * FROM orders WHERE id=($1)";
      const order = await conn.query(sqlOrder, [orderID]);
      if (order.rowCount === 0) {
        throw new Error("you should provide existing order_id");
      }
      const sql = "UPDATE orders SET status=($1) WHERE id=($2)";
      const res = await conn.query(sql, ["close", orderID]);
      conn.release();
      return res.rows[0];
    } catch (err) {
      throw new Error(`could not close the order. ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderID: number,
    productID: number
  ): Promise<OrderedProduct> {
    try {
      const conn = await client.connect();
      const sqlOrder = "SELECT * FROM orders WHERE id=($1)";
      const resOrder = await conn.query(sqlOrder, [orderID]);
      if (resOrder.rowCount === 0) {
        throw new Error("you should provide existing order_id");
      }
      const sqlproduct = "SELECT * FROM products WHERE id=($1)";
      const resProducst = await conn.query(sqlproduct, [productID]);
      if (resProducst.rowCount === 0) {
        throw new Error("you should provide existing product_id");
      }
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
