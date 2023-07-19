import { Request, Response } from "express";
import { Ticket, orderItem, ticketOrder } from "../database/models";

const bookTicket = async (req: Request, res: Response) => {
  try {
    const { tickets } = req.body;

    const ticketOrders = await ticketOrder.create({
      ticketStatus: "pending",
      totalAmount: 0,
      registrationDate: new Date(),
    });

    for (const ticketData of tickets) {
      console.log(tickets, "/*/*/*/*/*/*/*/*/*//**/*/*/*");
      const { name, email, phone, tickeTypeId } = ticketData;

      // check isTicket Type availble or not

      const ticket = await Ticket.findByPk(tickeTypeId);
      console.log("ticket", ticket);

      if (!ticket) {
        return res
          .status(404)
          .json({ message: `Ticket not found with ID ${tickeTypeId}` });
      }
      return;
      const totalAmount: number = ticket.ticketPrice;

      await orderItem.create({
        name,
        email,
        phone,
        tickeTypeId,
        ticketPrice: ticket.ticketPrice,
        ticketOrderId: ticketOrders.id,
      });

      ticketOrders.totalAmount += totalAmount;
      await ticketOrders.save();
    }

    res.status(201).json({
      status: 201,
      message: "success",
      ticketOrders,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { bookTicket };
