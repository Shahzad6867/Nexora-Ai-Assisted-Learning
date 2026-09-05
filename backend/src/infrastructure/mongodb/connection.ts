import mongoose from "mongoose"
import env from "../../config/env.config"
import { ILogger } from "../../application/interfaces/ILogger"
import { AppError } from "../../presentation/error/app.error"
import { HTTP_STATUS_CODES } from "../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum"
export default async function connectMongoDB(logger : ILogger){

    try {
        await mongoose.connect(env.MONGODB_CONNECTION_STRING)
        logger.info("MongoDB Connected")
    } catch (error) {
        throw new AppError("Something went wrong while connecting DB",HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
}