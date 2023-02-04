import { type RequestHandler, type Request, type Response } from "express";
import type express from "express";
import { type User, UserStore } from "../models/userModel";

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
  try {
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
  const newUser = await store.create(user);
  res.json(newUser);
};

const userRoutes = (app: express.Application): void => {
  app.get("/users", index as RequestHandler);
  app.post("/users", create as RequestHandler);
  app.get("/users/:id", show as RequestHandler);
};

export default userRoutes;
