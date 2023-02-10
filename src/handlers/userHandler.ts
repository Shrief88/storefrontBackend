import { type RequestHandler, type Request, type Response } from "express";
import type express from "express";
import { type User, UserStore } from "../models/userModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import verifyAuthToken from "../middlewares/verifyAuthToken";
import {
  createUserSchema,
  IDSchema,
  authentiacateUserSchema,
} from "../utilities/validators";

dotenv.config();
const { TOKEN_SECRET } = process.env;

const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await store.index();
    res.json(users);
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
  const user: User = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  try {
    createUserSchema.validateSync(user);
    const newUser = await store.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const authenticate = async (req: Request, res: Response): Promise<void> => {
  const input: { email: string; password: string } = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    authentiacateUserSchema.validateSync(input);
    const user = await store.authenticate(req.body.email, req.body.password);
    const token = jwt.sign({ user }, TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const userRoutes = (app: express.Application): void => {
  app.get("/users", verifyAuthToken, index as RequestHandler);
  app.post("/users", create as RequestHandler);
  app.get("/users/:id", verifyAuthToken, show as RequestHandler);
  app.post("/users/authentiacate", authenticate as RequestHandler);
};

export default userRoutes;
