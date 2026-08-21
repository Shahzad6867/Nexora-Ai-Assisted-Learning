import {createClient} from "redis"
import env from "../../config/env.config"

const redisClient = createClient({
    url : env.REDIS_CONNECTION_STRING || "redis://127.0.0.1:6379"
})

redisClient.on("error",(error) => {
    console.error("Redis Client Error",error)
})

export const connectRedis = async (): Promise<void> => {
    await redisClient.connect()
    console.log("Redis Client Connected")
}

export default redisClient
