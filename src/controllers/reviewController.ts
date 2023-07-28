import { Request, Response } from "express";
import { Ticket, orderItem } from "../database/models";

const createReview = async (req: Request, res: Response) => {
  const ticketBuyerId = req.params.id;

  //   const { rating, comment, eventId, buyerId, } = req.body;

  const isBuyerExist = await orderItem.findByPk(ticketBuyerId, {
    include: [
      {
        model: Ticket,
      },
    ],
  });
  console.log(
    "🚀 ~ file: reviewController.ts:23 ~ createReview ~ isBuyerExist:",
    isBuyerExist
  );
};

export { createReview };
