import { Request, Response } from "express";
import { ticketOrder } from "../database/models";
import { now } from "sequelize/types/utils";

const booTicket = async (req: Request, res: Response) => {
  const { name, email, phone, tickeTypeId } = req.body;
  console.log("user details +++++++", { name, email, phone, tickeTypeId });

  const ticketOrders = await ticketOrder.create({
    ticketStatus: "booked",
    totalAmount: 100,
    registrationDate: new Date(),
  });
};

export { booTicket };
