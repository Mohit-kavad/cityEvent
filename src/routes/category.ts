import { Router } from "express";
import { verifyToken } from "../middlewares/validation/auth/verifyToken";
import {
  createCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController";
import { restrictTo } from "../middlewares/validation/auth/roleAuth";

const categoryRouter = Router();

categoryRouter.post(
  "/category",
  verifyToken,
  restrictTo("admin"),
  createCategory
);

categoryRouter.get(
  "/all-category",
  verifyToken,
  restrictTo("admin"),
  getCategories
);
categoryRouter.get(
  "/category/:id",
  verifyToken,
  restrictTo("admin"),
  getCategoryById
);

categoryRouter.patch(
  "/update-category/:id",
  verifyToken,
  restrictTo("admin"),
  updateCategory
);

categoryRouter.delete(
  "/delete-category/:id",
  verifyToken,
  restrictTo("admin"),
  deleteCategoryById
);

export { categoryRouter };
