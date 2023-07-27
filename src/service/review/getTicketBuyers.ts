import { QueryTypes } from "sequelize";
import { sequelize } from "../../database/models/connection";

const getTicketBuyersForEvent = async (eventId: number) => {
  try {
    const query = `SELECT OI."name",
                    OI."email",
                    OI."ticketTypeId",
                    TK."id" AS "ticket id",
                    TK."eventId",
                    Ev."eventTitle"
                    FROM "orderItems" AS OI
                    INNER JOIN "Tickets" AS TK ON OI."ticketTypeId" = TK."id" 
                    INNER JOIN "Events" AS Ev ON TK."eventId" = Ev."id"
                    WHERE tk."eventId" = ${eventId}`;

    const orders = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return orders;
  } catch (error) {
    throw error;
  }
};

export { getTicketBuyersForEvent };
