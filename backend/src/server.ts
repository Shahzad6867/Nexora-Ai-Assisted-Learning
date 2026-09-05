import app from "./app";
import env from "./config/env.config";
import { WinstonLogger } from "./infrastructure/logger/logger";
import connectMongoDB from "./infrastructure/mongodb/connection";
import { connectRedis } from "./infrastructure/redis/connection";


const logger = new WinstonLogger()
async function connectServerAndDb() {
  try {
    await connectMongoDB(logger);
    await connectRedis();
    app.listen(env.PORT, (error) => {
      if (error) {
        logger.error("Something went wrong", error.message);
      }
      logger.info("Server connected at PORT :", 5000);
    });
  } catch (error) {
    logger.error("Something went wrong while connecting server");
    process.exit();
  }
}
connectServerAndDb();
