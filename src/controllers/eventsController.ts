import { Request, Response } from "express";
import { Event_page, Event } from "../database/models/index";
import { point } from "../database/models/Event";

const createEvent = async (req: Request, res: Response) => {
  try {
    // check user has page created page or not
    //@ts-ignore
    const userId = req.user.id;

    const isPageExist = await Event_page.findAll({ where: { userId: userId } });

    if (isPageExist.length === 0) {
      return res.status(404).json({
        message:
          "There is no any organizer page created, Please First create page",
      });
    }

    const {
      eventTitle,
      eventImage,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      eventPageId,
    } = req.body;

    if (eventPageId === undefined) {
      return res.status(400).json({
        error: "eventPageId is required",
      });
    }

    if (!isPageExist.some((page) => page.id === eventPageId)) {
      return res.status(400).json({
        error: "the pageId does not exist or page is deleted",
      });
    }

    const coordinates = location.split(",");

    const point: point = {
      type: "Point",
      coordinates: [coordinates[0], coordinates[1]],
    };
    console.log(point);

    const event = await Event.create({
      eventTitle,
      eventImage,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      location: point,
      eventPageId,
    });

    res.status(201).json({
      status: 201,
      message: "success",
      event,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.findAll({
      include: {
        model: Event_page,
        as: "Hosted by",
        attributes: ["pageName"],
      },
    });
    res.status(200).json({
      status: 200,
      message: "success",
      events,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getEventById = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findByPk(eventId, {
      include: { model: Event_page, as: "Hosted by" },
    });
    res.status(200).json({
      status: 200,
      message: "success",
      event,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createEvent, getEvents, getEventById };
