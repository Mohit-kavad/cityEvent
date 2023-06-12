import { Router } from "express";
import { getUsers, getUser, deleteUser } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/user/:id", getUser);
userRouter.delete("/user/:id", deleteUser);
export { userRouter };
