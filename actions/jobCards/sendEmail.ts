"use server";
import nodemailer from "nodemailer";
import { prisma } from "../../lib/prisma";

async function getEmail(userId: string): Promise<string> {
  const res = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
    },
    select: {
      email: true,
    },
  });

  return res.email;
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendEmail(userId: string, subject: string, text: string) {
  const email = await getEmail(userId);

  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw {
        message: error.message,
      };
    }

    prisma.mailLog.create({
      data: {
        id: info.messageId,
        userId: userId,
        isSuccess: true,
      },
    });
  });
}

export { sendEmail };
