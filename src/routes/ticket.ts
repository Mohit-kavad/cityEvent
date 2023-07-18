import { Router } from "express";
import {
  createTicket,
  deleteTicket,
  getTicketsOfEvent,
  updateTicket,
} from "../controllers/ticketController";
import { verifyToken } from "../middlewares/validation/auth/verifyToken";

const ticketRouter = Router();

ticketRouter.post("/ticket", verifyToken, createTicket);

ticketRouter.get("/all-tickets/:eventId", verifyToken, getTicketsOfEvent);

ticketRouter.patch("/edit-ticket/:eventId", verifyToken, updateTicket);

ticketRouter.delete(
  "/remove-ticket/:eventId/:ticketId",
  verifyToken,
  deleteTicket
);

export { ticketRouter };
