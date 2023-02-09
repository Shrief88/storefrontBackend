import supertest from "supertest";
import app from "../..";
import client from "../../database";
import { UserStore } from "../../models/userModel";
import { OrderStore } from "../../models/orderModel";
import { ProductStore } from "../../models/productModel";

const request = supertest(app);

describe("testing orders endpoint response", () => {
  let token: string;
  beforeAll(async () => {
    const userStore = new UserStore();
    const orderStore = new OrderStore();
    const productStore = new ProductStore();
    await userStore.create({
      email: "shriefessam1999@gmail.com",
      first_name: "Shrief",
      last_name: "Essam",
      password: "Sh00000000",
    });
    const response = await request.post("/users/authentiacate").send({
      email: "shriefessam1999@gmail.com",
      password: "Sh00000000",
    });
    await orderStore.create({
      status: "open",
      user_id: 1,
    });
    await productStore.create({
      name: "mobile",
      price: 1000,
      category: "electronics",
    });
    token = response.body;
  });

  afterAll(async () => {
    const conn = await client.connect();
    await conn.query("DELETE FROM ordered_products");
    await conn.query("DELETE FROM orders");
    await conn.query("DELETE FROM products");
    await conn.query("DELETE FROM users");
    await conn.query("ALTER SEQUENCE ordered_products_id_seq RESTART WITH 1");
    await conn.query("ALTER SEQUENCE orders_id_seq RESTART WITH 1");
    await conn.query("ALTER SEQUENCE products_id_seq RESTART WITH 1");
    await conn.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
    conn.release();
  });

  describe("test [GET] /orders endpoint", () => {
    it("should return an error if user try to access without token", async () => {
      const response = await request.get("/orders");
      expect(response.status).toBe(401);
    });

    it("should return ok response if user enter a valid token", async () => {
      const response = await request.get("/orders").set({
        Authorization: `Bearer ${token}`,
      });
      expect(response.status).toBe(200);
    });
  });

  describe("test [POST] /orders endpoint", () => {
    it("should return ok response if user enter a valid token", async () => {
      const response = await request
        .post("/orders")
        .send({
          user_id: 1,
        })
        .set({
          Authorization: `Bearer ${token}`,
        });
      expect(response.status).toBe(200);
    });
  });

  describe("test [POST] /orders/:orderID/products endpoint", () => {
    it("should return ok response if user enter a valid token", async () => {
      const response = await request
        .post("/orders/1/products")
        .send({
          productId: 1,
          quantity: 1,
        })
        .set({
          Authorization: `Bearer ${token}`,
        });
      expect(response.status).toBe(200);
    });
  });

  describe("test [GET] /orders/active/:user_id endpoint", () => {
    it("should return ok response", async () => {
      const response = await request.get("/orders/active/1").set({
        Authorization: `Bearer ${token}`,
      });
      expect(response.status).toBe(200);
    });
  });

  describe("test [GET] /orders/close/:user_id endpoint", () => {
    it("should return ok response", async () => {
      const response = await request.get("/orders/close/1").set({
        Authorization: `Bearer ${token}`,
      });
      expect(response.status).toBe(200);
    });
  });

  describe("test [PUT] /orders/:orderID endpoint", () => {
    it("should return ok response", async () => {
      const response = await request.put("/orders/1").set({
        Authorization: `Bearer ${token}`,
      });
      expect(response.status).toBe(200);
    });
  });
});
