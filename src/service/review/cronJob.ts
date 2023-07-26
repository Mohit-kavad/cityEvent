import cron from "node-cron";
import { getTicketBuyersForEvent } from "./getTicketBuyers";
import { getEndedEvents } from "./getEndedEvents";
import { sendEmailToBuyers } from "./sendEmail";

const cronSchedule = " * * * * *";

const mainCornJob = () => {
  cron.schedule(cronSchedule, async () => {
    try {
      const endedEvents = await getEndedEvents();

      for (const event of endedEvents) {
        const ticketBuyers = await getTicketBuyersForEvent(event.id);
        sendEmailToBuyers(ticketBuyers, event);
      }
    } catch (error) {
      console.log("🚀 ~ file: cronJob.ts:11 ~ cron.schedule ~ error:", error);
    }
  });
};

export { mainCornJob };
