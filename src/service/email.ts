import nodemailer from "nodemailer";

export type EmailData = {
  from: string;
  title: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEamil({ title, from, message }: EmailData) {
  const mailData = {
    to: process.env.EMAIL_USER,
    subject: `[TADADADA_BLOG] ${title}`,
    from,
    html: `
          <h1>${title}</h1>
          <div>${message}</div>
          <br/>
          <p>${from}</p>
          `,
  };

  return transporter.sendMail(mailData);
}
