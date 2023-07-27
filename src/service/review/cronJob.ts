import cron from "node-cron";
import { getTicketBuyersForEvent } from "./getTicketBuyers";
import { getEndedEvents } from "./getEndedEvents";
import { sendEmailToBuyers } from "./sendEmail";

const cronSchedule = " 10 12 * * *";

const mainCornJob = () => {
  cron.schedule(cronSchedule, async () => {
    try {
      const endedEvents = await getEndedEvents();
      console.log(
        "🚀 ~ file: cronJob.ts:12 ~ cron.schedule ~ endedEvents:",
        endedEvents
      );

      for (const event of endedEvents) {
        console.log(
          "🚀 ~ file: cronJob.ts:18 ~ cron.schedule ~ event:",
          event.id
        );

        const ticketBuyers = await getTicketBuyersForEvent(event.id);
        sendEmailToBuyers(ticketBuyers, event);
      }
    } catch (error) {
      console.log("🚀 ~ file: cronJob.ts:11 ~ cron.schedule ~ error:", error);
    }
  });
};

export { mainCornJob };
