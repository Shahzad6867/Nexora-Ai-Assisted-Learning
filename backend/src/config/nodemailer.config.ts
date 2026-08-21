import nodemailer from "nodemailer";
import env from "./env.config";

export const transporter = nodemailer.createTransport({
  host: env.BREVO_SMTP_SERVER,
  port: env.BREVO_SMTP_PORT,
  secure: false, 
  auth: {
    user: env.BREVO_SMTP_LOGIN,
    pass: env.BREVO_SMTP_KEY, 
  },
} as nodemailer.TransportOptions);

