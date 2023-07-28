import { Router } from "express";
import { createReview } from "../controllers/reviewController";

const reviewRouter = Router();

reviewRouter.post("/review-event/:id", createReview);

export { reviewRouter };
