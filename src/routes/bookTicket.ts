import { Router } from "express";
import { bookTicket } from "../controllers/bookTicketsController";

const ticketBookingRouter = Router();

ticketBookingRouter.post("/book-ticket", bookTicket);

export { ticketBookingRouter };
