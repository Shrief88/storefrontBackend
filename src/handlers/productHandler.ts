import { type Product, ProductStore } from "../models/productModel";
import { type RequestHandler, type Request, type Response } from "express";
import type express from "express";
import verifyAuthToken from "../middlewares/verifyAuthToken";
import {
  createProductSchema,
  IDSchema,
  categorySchema,
} from "../utilities/validators";

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
  const input: { id: number } = { id: parseInt(req.params.id) };
  try {
    IDSchema.validateSync(input);
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
    createProductSchema.validateSync(product);
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
  const input: { category: string } = { category: req.params.category };
  try {
    categorySchema.validateSync(input);
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
