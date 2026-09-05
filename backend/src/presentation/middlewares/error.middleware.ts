import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/app.error";
import { ResponseHelper } from "../controllers/helpers/response.helper";
import { HTTP_STATUS_CODES } from "../controllers/httpStatusCodes/httpStatusCodes.enum";
import { WinstonLogger } from "../../infrastructure/logger/logger";

const logger = new WinstonLogger();

export const errorMiddleware = (
    err: AppError | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        logger.error(err.message,"ERROR MIDDLEWARE CAUGHT AN APP ERROR");
        return ResponseHelper.failure(res,err.message, err.statusCode);
    }

    logger.error(err.message,"ERROR MIDDLEWARE CAUGHT AN ERROR");

    return ResponseHelper.failure(res,"Internal Server Error", HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);

}