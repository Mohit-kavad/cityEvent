import { Router } from "express";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/userController";
import { login, signUp } from "../controllers/authController";
import { verifyToken } from "../middlewares/validation/auth/verifyToken";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);

userRouter.get("/users", verifyToken, getUsers);
userRouter.get("/user/:id", verifyToken, getUser);

userRouter.patch("/user/:id", verifyToken, updateUser);

userRouter.delete("/user/:id", verifyToken, deleteUser);

export { userRouter };
