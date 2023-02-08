import supertest from "supertest";
import app from "../..";
import clinet from "../../database";
import { UserStore } from "../../models/userModel";

const request = supertest(app);

describe("testing products endpoint response", () => {
  let token: string;
  beforeAll(async () => {
    const store = new UserStore();
    await store.create({
      email: "shriefessam1999@gmail.com",
      first_name: "Shrief",
      last_name: "Essam",
      password: "Sh00000000",
    });
    const response = await request.post("/users/authentiacate").send({
      email: "shriefessam1999@gmail.com",
      password: "Sh00000000",
    });
    token = response.body;
  });

  afterAll(async () => {
    const conn = await clinet.connect();
    let sql: string = "DELETE FROM users";
    await conn.query(sql);
    sql = "DELETE FROM products";
    await conn.query(sql);
    conn.release();
  });

  describe("test [GET] /products endpoint", () => {
    it("should return ok response", async () => {
      const response = await request.get("/products");
      expect(response.status).toBe(200);
    });
  });

  describe("test [POST] /products endpoint", () => {
    it("should return an error if user try to access without token", async () => {
      const response = await request.post("/products").send({
        name: "mobile",
        price: 1000,
        category: "electronics",
      });
      expect(response.status).toBe(401);
    });

    it("should return 400 response if any required attribute is missing", async () => {
      const response = await request
        .post("/products")
        .send({
          price: 1000,
          category: "electronics",
        })
        .set({
          Authorization: `Bearer ${token}`,
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 response if any attribute is empty", async () => {
      const response = await request
        .post("/users")
        .send({
          name: "",
          price: 1000,
          category: "electronics",
        })
        .set({
          Authorization: `Bearer ${token}`,
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 response if price is not number", async () => {
      const response = await request
        .post("/users")
        .send({
          name: "mobile",
          price: "1000",
          category: "electronics",
        })
        .set({
          Authorization: `Bearer ${token}`,
        });
      expect(response.status).toBe(400);
    });

    it("should return 400 response if any string attribute is a number", async () => {
      const response = await request
        .post("/users")
        .send({
          name: "mobile",
          price: "1000",
          category: 123,
        })
        .set({
          Authorization: `Bearer ${token}`,
        });
      expect(response.status).toBe(400);
    });

    it("should return ok response if user enter a valid token", async () => {
      const response = await request
        .post("/products")
        .send({
          name: "mobile",
          price: 1000,
          category: "electronics",
        })
        .set({
          Authorization: `Bearer ${token}`,
        });
      expect(response.status).toBe(200);
    });
  });

  describe("test [GET] /products/:id endpoint", () => {
    it("should return not found response if user enter an unvalid input", async () => {
      const response = await request.get("/products/ffdfd");
      expect(response.status).toBe(404);
    });

    it("should return ok response", async () => {
      const response = await request.get("/products/1");
      expect(response.status).toBe(200);
    });
  });

  describe("test [GET] /products/category/:category endpoint", () => {
    it("should return not found response if user enter an unvalid input", async () => {
      const response = await request.get("/products/ffdfd");
      expect(response.status).toBe(404);
    });

    it("should return ok response", async () => {
      const response = await request.get("/products/category/electronics");
      expect(response.status).toBe(200);
    });
  });
});
