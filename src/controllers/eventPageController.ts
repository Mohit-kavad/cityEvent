import { Request, Response } from "express";
import { Event_page, User } from "./../database/models/index";

const createPage = async (req: Request, res: Response) => {
  try {
    const { pageName } = req.body;
    const page = await Event_page.create({
      pageName: pageName,
      //@ts-ignore
      userId: req.user.id,
    });

    res.status(201).json({
      status: 200,
      message: "success",
      page,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPages = async (req: Request, res: Response) => {
  try {
    const pages = await Event_page.findAll({
      attributes: ["id", "pageName", "userId", "createdAt", "updatedAt"],
      include: {
        model: User,
        attributes: [
          "id",
          "firstName",
          "lastName",
          "email",
          "username",
          "role",
        ],
      },
    });
    res.status(200).json({
      status: 200,
      message: "success",
      pages,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createPage, getPages };
