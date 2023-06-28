import { Router } from "express";
import { createEvent } from "../controllers/eventsController";
import { verifyToken } from "../middlewares/validation/auth/verifyToken";

const eventRouter = Router();

eventRouter.get("create-event", verifyToken, createEvent);

export { eventRouter };
