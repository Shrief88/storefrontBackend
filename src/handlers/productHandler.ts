import { type Product, ProductStore } from "../models/productModel";
import { type RequestHandler, type Request, type Response } from "express";
import type express from "express";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const store = new ProductStore();

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    if (isNaN(parseInt(req.params.id))) {
      throw new Error("you should provide a number as id");
    }
    const user = await store.show(parseInt(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getOrderByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await store.getOrderByCategory(req.params.category);
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTopFive = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.getTopFive();
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const productRoutes = (app: express.Application): void => {
  app.get("/products", index as RequestHandler);
  app.post("/products", verifyAuthToken, create as RequestHandler);
  app.get("/products/:id", show as RequestHandler);
  app.get("/products/category/:category", getOrderByCategory as RequestHandler);
  app.get("/products/top/five", getTopFive as RequestHandler);
};

export default productRoutes;
