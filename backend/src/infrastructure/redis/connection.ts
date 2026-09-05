import {createClient} from "redis"
import env from "../../config/env.config"
import { WinstonLogger } from "../logger/logger"

const logger = new WinstonLogger()

const redisClient = createClient({
    url : env.REDIS_CONNECTION_STRING || "redis://127.0.0.1:6379"
})

redisClient.on("error",(error) => {
    logger.error("Redis Client Error",error)
})

export const connectRedis = async (): Promise<void> => {
    await redisClient.connect()
    logger.info("Redis Client Connected")
}

export default redisClient
