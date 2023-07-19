import { Request, Response } from "express";
import { Event, Ticket } from "../database/models";

const createTicket = async (req: Request, res: Response) => {
  try {
    const {
      ticketName,
      ticketPrice,
      totalTickets,
      ticketDescription,
      availableTickets,
      eventId,
    } = req.body;

    const isEventExist = await Event.findByPk(eventId);

    if (!isEventExist) {
      return res.status(404).json({
        message: `There is no any Event From this id : ${eventId}`,
      });
    }
    const ticket = await Ticket.create({
      ticketName,
      ticketPrice,
      totalTickets,
      ticketDescription,
      availableTickets,
      eventId,
    });

    res.status(200).json({
      status: 201,
      message: "success",
      ticket,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTicketsOfEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;

    const tickets = await Ticket.findAll({ where: { eventId: eventId } });

    if (tickets.length === 0) {
      return res.status(404).json({
        message: `There is no any Ticket From this Event id : ${eventId}`,
      });
    }

    res.status(200).json({
      status: 201,
      message: "success",
      tickets,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateTicket = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    const { id, ticketName, ticketPrice, totalTickets, ticketDescription } =
      req.body;

    const updatedTicket = await Ticket.update(
      { id, ticketName, ticketPrice, totalTickets, ticketDescription },
      { where: { eventId: eventId } }
    );

    res.status(200).json({
      status: 200,
      message: "Success",
      updatedTicket,
    });
  } catch (error) {}
};

const deleteTicket = async (req: Request, res: Response) => {
  try {
    const ticketId = req.params.ticketId;
    const eventId = req.params.eventId;

    const isEventExist = await Event.findByPk(eventId);
    if (!isEventExist) {
      return res.status(404).json({
        message: `There is no event with id: ${eventId}`,
      });
    }

    const ticket = await Ticket.findOne({
      where: { id: ticketId, eventId: eventId },
    });

    if (!ticket) {
      return res.status(404).json({
        message: `Ticket not found`,
      });
    }

    await ticket.destroy();

    res.status(200).json({
      status: 200,
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createTicket, getTicketsOfEvent, updateTicket, deleteTicket };
