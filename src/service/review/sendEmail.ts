import nodemailer from "nodemailer";

const sendEmail = async (to: any, subject: any, content: any) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: content,
  };

  await transporter.sendMail(mailOptions);
};

const sendEmailToBuyers = async (buyers: any, event: any) => {
  for (const buyer of buyers) {
    const emailContent = `Hello ${buyer.name},\n\nThe event "${buyer.eventTitle}" has ended. Thank you for attending the event and purchasing tickets. We hope you had a great time!\n\nWe value your feedback. If you enjoyed the event, we would appreciate it if you could take a moment to leave a review <a>Review link http://localhost:8000/review-event/${buyer.id}</a>. Your feedback will help us improve and provide better experiences in the future.\n\nBest regards,\nThe Event Team`;

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
