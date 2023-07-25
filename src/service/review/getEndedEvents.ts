import sequelize from "sequelize";
import { Event } from "../../database/models";

const getEndedEvents = async () => {
  try {
    const currentDate = new Date();
    const endedEvents = await Event.findAll({
      where: { endDate: { [sequelize.Op.lt]: currentDate } },
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
