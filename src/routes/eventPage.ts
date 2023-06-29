import { Router } from "express";
import { createPage, getPages } from "../controllers/eventPageController";
import { verifyToken } from "../middlewares/validation/auth/verifyToken";

const pageRouter = Router();

pageRouter.post("/create-eventPage", verifyToken, createPage);

pageRouter.get("/event-pages", verifyToken, getPages);

export { pageRouter };
