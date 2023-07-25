import { Request, Response } from "express";
import { Event } from "../database/models";

const createReview = async (req: Request, res: Response) => {
  const { rating, comment, eventId, userId } = req.body;

  const event = await Event.findByPk(eventId);
  if (!event) {
    return res.status(404).json({
      message: `You can not write review of this event`,
    });
  }
};
