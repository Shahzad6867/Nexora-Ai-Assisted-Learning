import { NextFunction, Request, Response } from "express";
import { ResponseHelper } from "../controllers/helpers/response.helper";
import { HTTP_STATUS_CODES } from "../controllers/httpStatusCodes/httpStatusCodes.enum";
import jwt from "jsonwebtoken"
import env from "../../config/env.config";


export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return ResponseHelper.failure(res,"ACCESS_TOKEN_NOT_FOUND",HTTP_STATUS_CODES.UNAUTHORIZED)
    }

    const token = authHeader.split(" ")[1]
    try {
        const payload = jwt.verify(token,env.JWT_ACCESS_SECRET_KEY)
        next()
    } catch (error : any) {
        if(error instanceof jwt.TokenExpiredError){
            return ResponseHelper.failure(res,"ACCESS_TOKEN_EXPIRED",HTTP_STATUS_CODES.UNAUTHORIZED)
        }
        return ResponseHelper.failure(res,error?.message,HTTP_STATUS_CODES.UNAUTHORIZED)
    }
};
