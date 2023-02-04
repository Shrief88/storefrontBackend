import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();
const { TOKEN_SECRET } = process.env;

const verifyAuthToken = (req: Request, res: Response, next: Function): void => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split(" ")[1];
    jwt.verify(token, TOKEN_SECRET as string);
    next();
  } catch (error) {
    res.status(401).json("Access denied, invalid token");
  }
};

export default verifyAuthToken;
