import { Router } from "express";
import { getUsers, getUser, deleteUser } from "../controllers/userController";
import { login, signUp } from "../controllers/authController";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);

userRouter.get("/users", getUsers);
userRouter.get("/user/:id", getUser);
userRouter.delete("/user/:id", deleteUser);

export { userRouter };
