import express, { Application, Response, Request } from "express";
import dotenv from "dotenv";
import { sequelize } from "./database/models/connection";

const app: Application = express();

dotenv.config();
app.use(express.json());

app.use("/", (req: Request, res: Response) => {
  res.send("HELLO WORLD");
});

const port = process.env.PORT || 8000;

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
