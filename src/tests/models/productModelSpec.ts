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
  });

  describe("test model methods", () => {
    describe("create method", () => {
      it("create method should add a product", () => {
        expect(newProduct).toEqual({
          id: 1,
          name: "mobile",
          price: 1000,
          category: "electronics",
        });
      });

      it("should throw an error if email name exist", async () => {
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
          id: 1,
          name: "mobile",
          price: 1000,
          category: "electronics",
        });
      });

      it("should throw an error if user enter not existing id", async () => {
        let errMessage: string = "";
        try {
          await store.show(3);
        } catch (err) {
          errMessage = err.message;
        }
        expect(errMessage).toEqual(
          "could not get product, Error: you should provide existing id"
        );
      });
    });

    it("index method should retern list of users", async () => {
      const result = await store.index();
      expect(result.length).toEqual(1);
    });
  });
});
