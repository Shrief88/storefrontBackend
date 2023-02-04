import { type RequestHandler, type Request, type Response } from "express";
import type express from "express";
import { type User, UserStore } from "../models/userModel";
import { validateEmail } from "../utilities/emailValidation";

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
  const user: User = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  try {
    if (
      user.email === "" ||
      user.first_name === "" ||
      user.last_name === "" ||
      user.password === ""
    ) {
      throw new Error("you should provide all user attributes");
    }

    if (!validateEmail(user.email)) {
      throw new Error("you should provide a valid email address");
    }

    const newUser = await store.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const userRoutes = (app: express.Application): void => {
  app.get("/users", index as RequestHandler);
  app.post("/users", create as RequestHandler);
  app.get("/users/:id", show as RequestHandler);
};

export default userRoutes;
