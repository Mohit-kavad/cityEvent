import { Request, Response } from "express";
import { Event_page } from "../database/models/index";

const createEvent = async (req: Request, res: Response) => {
  try {
    // check user has page created page or not
    //@ts-ignore
    const userId = req.user.id;
    const isPageExist = await Event_page.findAll({});
    console.log(isPageExist);
    res.json({ name: "dfd" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createEvent };
