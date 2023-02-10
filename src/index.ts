import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./handlers/userHandler";
import productRoutes from "./handlers/productHandler";
import orderRoutes from "./handlers/orderHandler";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const { PORT } = process.env;

const app = express();
const port = parseInt(PORT as string);
const host = "localhost";

app.use(cors());
app.use(bodyParser.json());
userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Welcome to storefront API from Fullstack Nanodegre");
});

app.listen(port, host, () => {
  console.log(`app is rurnning on http://${host}:${port}`);
});

export default app;
