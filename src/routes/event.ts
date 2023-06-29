import { Router } from "express";
import {
  createEvent,
  getEventById,
  getEvents,
} from "../controllers/eventsController";
import { verifyToken } from "../middlewares/validation/auth/verifyToken";

const eventRouter = Router();

eventRouter.post("/create-event", verifyToken, createEvent);

eventRouter.get("/events", verifyToken, getEvents);
eventRouter.get("/event/:eventId", verifyToken, getEventById);

export { eventRouter };
