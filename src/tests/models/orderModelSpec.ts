import client from "../../database";
import { type Order, OrderStore } from "../../models/orderModel";
import { type Product, ProductStore } from "../../models/productModel";
import { type User, UserStore } from "../../models/userModel";

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe("order model", () => {
  let newOrder: Order;
  let newUser: User;
  let newProduct: Product;
  beforeAll(async () => {
    newUser = await userStore.create({
      email: "shriefessam1999@gmail.com",
      first_name: "Shrief",
      last_name: "Essam",
      password: "password123",
    });
    newOrder = await orderStore.create({
      status: "open",
      user_id: newUser.id as number,
    });
    await orderStore.create({
      status: "close",
      user_id: newUser.id as number,
    });

    newProduct = await productStore.create({
      name: "mobile",
      price: 1000,
      category: "electronics",
    });

    await orderStore.addProduct(
      5,
      newOrder.id as number,
      newProduct.id as number
    );
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

  describe("model should have all Requirements methods", () => {
    it("should have index method", () => {
      expect(orderStore.index).toBeDefined();
    });
    it("should have getOrderProducts method", () => {
      expect(orderStore.getOrderProducts).toBeDefined();
    });
    it("should have create method", () => {
      expect(orderStore.create).toBeDefined();
    });
    it("should have getActiveOrdersByUser method", () => {
      expect(orderStore.getActiveOrdersByUser).toBeDefined();
    });
    it("should have getClosedOrdersByUser method", () => {
      expect(orderStore.getClosedOrdersByUser).toBeDefined();
    });
    it("should have closeOrder method", () => {
      expect(orderStore.closeOrder).toBeDefined();
    });
    it("should have addProduct method", () => {
      expect(orderStore.addProduct).toBeDefined();
    });
  });

  describe("test model methods", () => {
    describe("index method", () => {
      it("index method should retern list of orders", async () => {
        const result = await orderStore.index();
        expect(result).toEqual([
          {
            id: newOrder.id,
            status: "open",
            user_id: newOrder.user_id,
          },
          {
            id: (newOrder.id as number) + 1,
            status: "close",
            user_id: newOrder.user_id,
          },
        ]);
      });
    });

    describe("create method", () => {
      it("create method should add a order", () => {
        expect(newOrder).toEqual({
          id: newOrder.id,
          user_id: newOrder.user_id,
          status: "open",
        });
      });
    });

    describe("getActiveOrdersByUser", () => {
      it("should return list of active orders by user", async () => {
        const res = await orderStore.getActiveOrdersByUser(
          newUser.id as number
        );
        expect(res).toEqual([
          {
            id: newOrder.id,
            status: "open",
            user_id: newOrder.user_id,
          },
        ]);
      });

      it("should throw an error if userID is not existing", async () => {
        let errMessage: string = "";
        try {
          await orderStore.getActiveOrdersByUser((newUser.id as number) + 1);
        } catch (err) {
          errMessage = err.message;
        }
        expect(errMessage).toEqual(
          "could not get orders, Error: you should provide existing user_id"
        );
      });
    });

    describe("getClosedOrdersByUser", () => {
      it("should return list of closed orders by user", async () => {
        const res = await orderStore.getClosedOrdersByUser(
          newUser.id as number
        );
        expect(res).toEqual([
          {
            id: (newOrder.id as number) + 1,
            status: "close",
            user_id: newOrder.user_id,
          },
        ]);
      });
      it("should throw an error if userID is not existing", async () => {
        let errMessage: string = "";
        try {
          await orderStore.getActiveOrdersByUser((newUser.id as number) + 1);
        } catch (err) {
          errMessage = err.message;
        }
        expect(errMessage).toEqual(
          "could not get orders, Error: you should provide existing user_id"
        );
      });
    });

    describe("addProduct method", () => {
      it("should add product to the right order", async () => {
        const products = await orderStore.getOrderProducts(
          newOrder.id as number
        );

        expect(products).toEqual([
          {
            name: "mobile",
            quantity: 5,
            price: 1000,
          },
        ]);
      });
    });

    describe("getOrderProducts method", () => {
      it("should return list of all order products", async () => {
        const res = await orderStore.getOrderProducts(newOrder.id as number);
        expect(res).toEqual([
          {
            name: "mobile",
            quantity: 5,
            price: 1000,
          },
        ]);
      });
      it("should throw an error if orderID is not existing", async () => {
        let errMessage: string = "";
        try {
          await orderStore.getOrderProducts((newOrder.id as number) + 2);
        } catch (err) {
          errMessage = err.message;
        }
        expect(errMessage).toEqual(
          "could not get products, Error: you should provide existing order_id"
        );
      });
    });

    describe("closeOrder method", () => {
      it("should close the order", async () => {
        await orderStore.closeOrder(1);
        const res = await orderStore.index();
        expect(res[0].status).toEqual("close");
      });
    });
  });
});
