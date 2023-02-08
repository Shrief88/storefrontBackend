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

  async getCompeletedOrdersByUser(userID: string): Promise<Order[]> {
    try {
      const conn = await clinet.connect();
      const sql = "SELECT * FROM orders WHERE user_id = ($1) AND status = ($2)";
      const res = await clinet.query(sql, [userID, "compelete"]);
      conn.release();
      return res.rows;
    } catch (err) {
      throw new Error(`could not get orders`);
    }
  }

  async getOrderProducts(orderID: string): Promise<Product[]> {
    try {
      const conn = await clinet.connect();
      const sqlProducts = "SELECT * FROM ordered_products WHERE order_id=($1)";
      const resProducts: QueryResult<OrderedProduct> = await clinet.query(
        sqlProducts,
        [orderID]
      );
      const orderedProducts = resProducts.rows;
      const products: Product[] = [];
      orderedProducts.map(async (item) => {
        const sql = "SELECT * FROM products WHERE id=($1)";
        const res = await clinet.query(sql, [item.id]);
        products.push(res.rows[0]);
      });
      conn.release();
      return products;
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
