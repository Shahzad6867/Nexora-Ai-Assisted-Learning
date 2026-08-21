import dotenv from "dotenv";
dotenv.config();

const env = {
  FRONTEND_URL: process.env.FRONTEND_URL,
  MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
  REDIS_CONNECTION_STRING: process.env.REDIS_CONNECTION_STRING,
  BREVO_SMTP_SERVER: process.env.BREVO_SMTP_SERVER,
  BREVO_SMTP_PORT: process.env.BREVO_SMTP_PORT,
  BREVO_SMTP_LOGIN: process.env.BREVO_SMTP_LOGIN,
  BREVO_SMTP_KEY: process.env.BREVO_SMTP_KEY,
  BREVO_SENDER: process.env.BREVO_SENDER,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,
  PORT: Number(process.env.PORT) || 5000,
};
console.log(env.GOOGLE_CALLBACK_URL);
export default env;
