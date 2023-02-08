import { type RequestHandler, type Request, type Response } from "express";
import type express from "express";
import { type Order, OrderStore } from "../models/orderModel";
import { type Product } from "../models/productModel";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const store = new OrderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getOrdersByUser = async (req: Request, res: Response): Promise<void> => {
  const userID = req.body.userID;
  try {
    const orders = await store.getOrdersByUser(userID);
    res.json(orders);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const showProducts = async (req: Request, res: Response): Promise<void> => {
  const orderID = req.body.orderID;
  try {
    const products = await store.getOrderProducts(orderID);
    res.json(products);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const products: Product[] = [];
  const order: Order = {
    status: "open",
    user_id: req.body.user_id,
    products,
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  const orderId: number = parseInt(req.params.id);
  const productId: number = req.body.productId;
  const quantity: number = parseInt(req.body.quantity);
  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application): void => {
  app.get("/orders", index as RequestHandler);
  app.get("/orders/:id", showProducts as RequestHandler);
  app.get("/orders/user/:id", getOrdersByUser as RequestHandler);
  app.post("/orders", verifyAuthToken, create as RequestHandler);
  app.post(
    "/orders/:id/products",
    verifyAuthToken,
    addProduct as RequestHandler
  );
};

export default orderRoutes;
