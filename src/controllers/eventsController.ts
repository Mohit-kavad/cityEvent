import { Request, Response } from "express";
import { Event_page, Event, Category } from "../database/models/index";
import { point } from "../database/models/Event";
import { CategoryEvent } from "../database/models/Categoryevent";

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

    // if (eventPageId === undefined) {
    //   return res.status(400).json({
    //     error: "eventPageId is required",
    //   });
    // }

    if (!isPageExist.some((page) => page.id === eventPageId)) {
      return res.status(400).json({
        error: "the pageId does not exist for this user or page is deleted",
      });
    }

    const coordinates = location.split(",");

    const point: point = {
      type: "Point",
      coordinates: [coordinates[0], coordinates[1]],
    };

    const categories = req.body.categoryId;

    for (const categoryId of categories) {
      const isCategoryExist = await Category.findByPk(categoryId);

      if (isCategoryExist === null) {
        return res.status(404).json({
          message: `There is no any category id : ${categoryId}`,
        });
      }
    }
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
      userId: userId,
      categoryId: categories,
    });
    //enter values in CategoryEvent
    categories.forEach(async (categoryId: number) => {
      await CategoryEvent.create({
        categoryId,
        eventId: event.id,
      });
    });

    res.status(201).json({
      status: 201,
      message: "success",
      event,
    });
  } catch (error) {
    console.log("------------------------------------------", error);
    res.status(500).json(error);
  }
};

const getEvents = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const events = await Event.findAll({ where: { userId: userId } });

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

    if (event === null) {
      return res.status(404).json({
        message: "Event Not found or deleted",
      });
    }

    res.status(200).json({
      status: 200,
      message: "success",
      event,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateEvent = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const eventId = req.params.eventId;
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

    const event = await Event.findOne({
      where: {
        id: eventId,
        userId: userId,
      },
    });

    if (!event) {
      return res.status(404).json({
        message: `you did not created any event from this id :${eventId}`,
      });
    }

    const eventPage = await Event_page.findOne({
      where: {
        id: eventPageId,
        userId: userId,
      },
    });

    if (!eventPage) {
      return res.status(404).json({
        message: `you dont have this page, pageId = ${eventPageId}, please provide valid pageId`,
      });
    }

    const coordinates = location.split(",");

    const point: point = {
      type: "Point",
      coordinates: [coordinates[0], coordinates[1]],
    };

    const updatedData = await Event.update(
      {
        eventTitle,
        eventImage,
        description,
        startDate,
        endDate,
        startTime,
        endTime,
        location: point,
        eventPageId,
      },
      {
        where: {
          id: eventId,
        },
      }
    );

    res.status(200).json({
      status: 200,
      message: "Success",
      updatedData,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createEvent, getEvents, getEventById, updateEvent };
