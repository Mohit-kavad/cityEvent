import { literal } from "sequelize";
import { Event } from "../../database/models";
import { Op } from "sequelize";

const getEndedEvents = async () => {
  try {
    const currentDate = new Date();
    const previousDayDate = new Date();
    previousDayDate.setDate(currentDate.getDate() - 1);
    previousDayDate;
    console.log(
      "🚀 ~ file: getEndedEvents.ts:8 ~ getEndedEvents ~ previousDayDate:",
      previousDayDate
    );

    const endedEvents = await Event.findAll({
      where: {
        endDate: {
          [Op.eq]: literal(`${previousDayDate.toISOString()}`),
        },
      },
    });
    console.log(
      "🚀 ~ file: getEndedEvents.ts:10 ~ getEndedEvents ~ endedEvents:",
      endedEvents
    );

    return endedEvents;
  } catch (error) {
    throw error;
  }
};

export { getEndedEvents };
