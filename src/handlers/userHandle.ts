import { type RequestHandler, type Request, type Response } from "express";
import type express from "express";
import { type User, UserStore } from "../models/userModel";

const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response): Promise<void> => {
  const user = await store.show(parseInt(req.params.id));
  res.json(user);
};

const create = async (req: Request, res: Response): Promise<void> => {
  const user: User = {
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
