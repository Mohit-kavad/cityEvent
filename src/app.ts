import express, { Application, Response, Request } from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/index";

const app: Application = express();

dotenv.config();
app.use(express.json());

app.use(userRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send("Page Not Found");
});

export { app };
