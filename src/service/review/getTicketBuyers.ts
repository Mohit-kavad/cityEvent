// import { orderItem } from "../../database/models";
import { QueryTypes } from "sequelize";
import { sequelize } from "../../database/models/connection";

const getTicketBuyersForEvent = async (eventId: number) => {
  try {
    // const orders = await orderItem.findAll({where:{

    // }})

    const query = `SELECT OI."name",
                   OI."email",
                   OI."ticketTypeId",
                   TK."id" AS "ticket id",
                   TK."eventId"
                   FROM "orderItems" AS OI
                   INNER JOIN "Tickets" AS TK ON OI."ticketTypeId" = TK."id" 
                   WHERE tk."eventId" = ${eventId}`;

    const orders = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    console.log(
      "🚀 ~ file: getTicketBuyers.ts:23 ~ getTicketBuyersForEvent ~ orders:",
      orders
    );
    return orders;
  } catch (error) {
    throw error;
  }
};

export { getTicketBuyersForEvent };
