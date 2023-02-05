import supertest from "supertest";
import app from "../..";
import clinet from "../../database";
import { UserStore } from "../../models/userModel";

const request = supertest(app);

describe("testing endpoint response", () => {
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
    const sql = "DELETE FROM users";
    await conn.query(sql);
    conn.release();
  });

  describe("test [GET] /users endpoint", () => {
    it("should return an error if user try to access without token", async () => {
      const response = await request.get("/users");
      expect(response.status).toBe(401);
    });

    it("should return ok response if user enter a valid token", async () => {
      const response = await request.get("/users").set({
        Authorization: `Bearer ${token}`,
      });
      expect(response.status).toBe(200);
    });
  });

  describe("test [GET] /users/:id endpoint", () => {
    it("should return an error if user try to access without token", async () => {
      const response = await request.get("/users/1");
      expect(response.status).toBe(401);
    });

    it("should return ok response if user enter a valid token", async () => {
      const response = await request.get("/users/1").set({
        Authorization: `Bearer ${token}`,
      });
      expect(response.status).toBe(200);
    });

    it("should return not found response if user enter an unvalid input", async () => {
      const response = await request.get("/users/ffdfd").set({
        Authorization: `Bearer ${token}`,
      });
      expect(response.status).toBe(404);
    });
  });

  describe("test [POST] /users endpoint", () => {
    it("should return an error if user try to access without token", async () => {
      const response = await request.post("/users").send({
        email: "shriefessam1888@gmail.com",
        password: "Sh00000000",
        first_name: "Shrief",
        last_name: "Essam",
      });
      expect(response.status).toBe(401);
    });

    it("should return ok response if user enter a valid token", async () => {
      const response = await request
        .post("/users")
        .send({
          email: "shriefessam1888@gmail.com",
          password: "Sh00000000",
          first_name: "Shrief",
          last_name: "Essam",
        })
        .set({
          Authorization: `Bearer ${token}`,
        });
      expect(response.status).toBe(200);
    });

    it("should return 400 response if any attribute is empty", async () => {
      const response = await request
        .post("/users")
        .send({
          password: "Sh00000000",
          first_name: "Shrief",
          last_name: "Essam",
        })
        .set({
          Authorization: `Bearer ${token}`,
        });
      expect(response.status).toBe(400);
    });
  });
});