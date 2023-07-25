import nodemailer from "nodemailer";

const sendEmail = async (to, subject, content) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
  });
};

const sendEmailToBuyers = async (buyers: any, event: any) => {
  for (const buyer of buyers) {
    const emailContent = `Hello ${buyer.name},\n\nThe event "${event.name}" has ended. Thank you for attending the event and purchasing tickets. We hope you had a great time!\n\nWe value your feedback. If you enjoyed the event, we would appreciate it if you could take a moment to leave a review. Your feedback will help us improve and provide better experiences in the future.\n\nBest regards,\nThe Event Team`;

    sendEmail(buyer.email, "Event Ended", emailContent)
      .then(() => {
        console.log(`Email sent successfully to ${buyer.email}`);
      })
      .catch((error) => {
        console.error(`Error sending email to ${buyer.email}:`, error);
      });
  }
};

export { sendEmailToBuyers };
