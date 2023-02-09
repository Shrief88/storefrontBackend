import client from "../../database";
import { type Product, ProductStore } from "../../models/productModel";

const store = new ProductStore();

describe("product model", () => {
  let newProduct: Product;
  beforeAll(async () => {
    newProduct = await store.create({
      name: "mobile",
      price: 1000,
      category: "electronics",
    });
  });

  afterAll(async () => {
    const conn = await client.connect();
    const sql = "DELETE FROM products";
    await conn.query(sql);
    await conn.query("ALTER SEQUENCE products_id_seq RESTART WITH 1");
    conn.release();
  });

  describe("model should have all Requirements methods", () => {
    it("should have index method", () => {
      expect(store.index).toBeDefined();
    });
    it("should have show method", () => {
      expect(store.show).toBeDefined();
    });
    it("should have create method", () => {
      expect(store.create).toBeDefined();
    });
    it("should have getOrderByCategory method", () => {
      expect(store.getOrderByCategory).toBeDefined();
    });
  });

  describe("test model methods", () => {
    describe("index method", () => {
      it("index method should retern list of users", async () => {
        const result = await store.index();
        expect(result).toEqual([
          {
            id: newProduct.id,
            name: "mobile",
            price: 1000,
            category: "electronics",
          },
        ]);
      });
    });

    describe("create method", () => {
      it("create method should add a product", () => {
        expect(newProduct).toEqual({
          id: newProduct.id,
          name: "mobile",
          price: 1000,
          category: "electronics",
        });
      });

      it("should throw an error if name exist", async () => {
        let errMessage: string = "";
        try {
          await store.create({
            name: "mobile",
            price: 1000,
            category: "electronics",
          });
        } catch (err) {
          errMessage = err.message;
        }
        expect(errMessage).toEqual(
          "could not create new product. Error: product is already exist!"
        );
      });
    });

    describe("show method", () => {
      it("should return the right product", async () => {
        const result = await store.show(1);
        expect(result).toEqual({
          id: newProduct.id,
          name: "mobile",
          price: 1000,
          category: "electronics",
        });
      });

      it("should throw an error if user enter not existing id", async () => {
        let errMessage: string = "";
        try {
          await store.show(2);
        } catch (err) {
          errMessage = err.message;
        }
        expect(errMessage).toEqual(
          "could not get product, Error: you should provide existing id"
        );
      });
    });

    describe("getOrderByCategory method", () => {
      it("should return empty list if category is not found", async () => {
        const result = await store.getOrderByCategory("books");
        expect(result).toEqual([]);
      });

      it("should return the right orders by category", async () => {
        const result = await store.getOrderByCategory("electronics");
        expect(result).toEqual([
          {
            id: result[0].id,
            name: "mobile",
            price: 1000,
            category: "electronics",
          },
        ]);
      });
    });
  });
});
