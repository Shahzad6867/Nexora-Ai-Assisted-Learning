import dotenv from "dotenv";
import z from "zod";
dotenv.config();

const envSchema = z.object({
  FRONTEND_URL: z.string().min(1, "FRONTEND URL is required"),
  MONGODB_CONNECTION_STRING: z
    .string()
    .min(1, "MONGODB_CONNECTION_STRING is required"),
  REDIS_CONNECTION_STRING: z
    .string()
    .min(1, "REDIS_CONNECTION_STRING is required"),
  BREVO_SMTP_SERVER: z.string().min(1, "BREVO_SMTP_SERVER is required"),
  BREVO_SMTP_PORT: z.string().min(1, "BREVO_SMTP_PORT is required"),
  BREVO_SMTP_LOGIN: z.string().min(1, "BREVO_SMTP_LOGIN is required"),
  BREVO_SMTP_KEY: z.string().min(1, "BREVO_SMTP_KEY is required"),
  BREVO_SENDER: z.string().min(1, "BREVO_SENDER is required"),
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
  GOOGLE_CALLBACK_URL: z.string().min(1, "GOOGLE_CALLBACK_URL is required"),
  JWT_ACCESS_SECRET_KEY: z
    .string()
    .min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),
    JWT_REFRESH_SECRET_KEY: z
    .string()
    .min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
  JWT_ACCESS_EXPIRES_IN: z.string().min(1, "JWT_ACCESS_EXPIRES_IN is required"),
  JWT_REFRESH_EXPIRES_IN: z.string().min(1, "JWT_REFRESH_EXPIRES_IN is required"),
  
  PORT: z.coerce.number().default(5000),
  REDIS_AUTH_DOCUMENT_EXPIRES_IN : z.coerce.number().default(600),
  LOG_LEVEL : z.string().min(1,"LOG_LEVEL is required"),
  NODE_ENV : z.string().min(1,"NODE_ENV is required")
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsedEnv.error.flatten().fieldErrors);

  process.exit(1);
}

const env = parsedEnv.data;
export default env;
