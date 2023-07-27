import { QueryTypes } from "sequelize";
import { sequelize } from "../../database/models/connection";

interface IEvent {
  id: number;
}
const getEndedEvents = async () => {
  try {
    const query = `SELECT *
                    FROM public."Events"
                    WHERE DATE("endTime") = CURRENT_DATE - 1  ;
                    `;
    const endedEvents: IEvent[] = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return endedEvents;
  } catch (error) {
    throw error;
  }
};

export { getEndedEvents };
