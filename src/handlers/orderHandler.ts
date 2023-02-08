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

const getActiveOrdersByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userID = req.params.userID;
  try {
    const orders = await store.getActiveOrdersByUser(userID);
    res.json(orders);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const getClosedOrdersByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userID = req.params.userID;
  try {
    const orders = await store.getClosedOrdersByUser(userID);
    res.json(orders);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const showProducts = async (req: Request, res: Response): Promise<void> => {
  const orderID = req.params.orderID;
  try {
    const products = await store.getOrderProducts(orderID);
    res.json(products);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  const orderId: number = parseInt(req.params.orderID);
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

const closeOrder = async (req: Request, res: Response): Promise<void> => {
  const orderId: number = parseInt(req.params.orderID);
  try {
    const updatedOrder = await store.closeOrder(orderId);
    res.json(updatedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application): void => {
  app.get("/orders", verifyAuthToken, index as RequestHandler);
  app.get("/orders/:orderID", verifyAuthToken, showProducts as RequestHandler);
  app.put("/orders/:orderID", verifyAuthToken, closeOrder as RequestHandler);
  app.post("/orders", verifyAuthToken, create as RequestHandler);
  app.get(
    "/orders/active/:userID",
    verifyAuthToken,
    getActiveOrdersByUser as RequestHandler
  );
  app.get(
    "/orders/close/:userID",
    verifyAuthToken,
    getClosedOrdersByUser as RequestHandler
  );
  app.post(
    "/orders/:orderID/products",
    verifyAuthToken,
    addProduct as RequestHandler
  );
};

export default orderRoutes;
