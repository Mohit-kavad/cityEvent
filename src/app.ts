import express, { Application, Response, Request } from "express";
import dotenv from "dotenv";
import { sequelize } from "./database/models/connection";
import { userRouter } from "./routes/index";

const app: Application = express();

dotenv.config();
app.use(express.json());

app.use(userRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send("Page Not Found");
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
