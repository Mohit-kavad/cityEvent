import { Request, Response } from "express";
import { Review, Ticket, orderItem } from "../database/models";

const createReview = async (req: Request, res: Response) => {
  try {
    const ticketBuyerId = req.params.id;

    const { rating, comment } = req.body;

    const isBuyerExist = await orderItem.findByPk(ticketBuyerId, {
      include: [
        {
          model: Ticket,
          as: "Ticket",
        },
      ],
    });
    console.log(
      "🚀 ~ file: reviewController.ts:18 ~ createReview ~ isBuyerExist:",
      isBuyerExist.id
    );

    const reviewsExist = await Review.findOne({
      where: { orderItemId: isBuyerExist.id },
    });

    if (reviewsExist !== null) {
      return res.status(404).json({
        message: `You have already put Review `,
      });
    }

    const review = await Review.create({
      rating,
      comment,
      reviewDate: new Date(),
      eventId: isBuyerExist.Ticket.eventId,
      orderItemId: isBuyerExist.id,
    });
    res.status(200).json({
      status: 200,
      message: "Success",
      review,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createReview };
