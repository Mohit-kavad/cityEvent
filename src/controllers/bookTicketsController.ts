import { Request, Response } from "express";
import { Ticket, orderItem, ticketOrder } from "../database/models";
import { Op } from "sequelize";

interface TicketType {
  ticketTypeId: number;
  name: string;
  email: string;
  phone: string;
}

const bookTicket = async (req: Request, res: Response) => {
  try {
    const { tickets } = req.body;

    const ticketIds: number[] = tickets.map((ticketType: TicketType) => {
      return ticketType.ticketTypeId;
    });

    const uniqueTicketId = [...new Set(ticketIds)];

    const ticket = await Ticket.findAll({
      where: {
        id: {
          [Op.in]: uniqueTicketId,
        },
      },
    });

    if (uniqueTicketId.length !== ticket.length) {
      const ticketIdsNotExist = ticketIds.filter(
        (id) => !ticket.some((ticket) => ticket.id === id)
      );
      return res.status(404).json({
        message: `This ticket Id is not available ${ticketIdsNotExist} Please Provide Valid ticketId`,
      });
    }

    const ticketOrders = await ticketOrder.create({
      ticketStatus: "pending",
      totalAmount: 0,
      registrationDate: new Date(),
    });
    const allTicketOrders = await Promise.all(
      tickets.map(async (data: TicketType) => {
        //Fetch ticketObject from ticket Array
        const ticketData = ticket.find(
          (ticket) => ticket.id === data.ticketTypeId
        );
        const totalAmount = ticketData.ticketPrice;

        const payLoad = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          ticketTypeId: data.ticketTypeId,
          ticketPrice: ticketData.ticketPrice,
          ticketOrderId: ticketOrders.id,
        };

        ticketOrders.totalAmount += totalAmount;
        await ticketOrders.save();

        return payLoad;
      })
    );

    await orderItem.bulkCreate(allTicketOrders);

    res.status(201).json({
      status: 201,
      message: "success",
      ticketOrders,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: bookTicketsController.ts:78 ~ bookTicket ~ error:",
      error
    );

    res.status(500).json(error);
  }
};

export { bookTicket };
