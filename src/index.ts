import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./handlers/userHandle";

const app = express();
const port = 3000;
const host = "localhost";

app.use(bodyParser.json());
userRoutes(app);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("heel");
});

app.listen(port, host, () => {
  console.log(`app is rurnning on http://${host}:${port}`);
});
