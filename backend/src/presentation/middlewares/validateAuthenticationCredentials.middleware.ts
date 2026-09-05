import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../error/app.error";
import { HTTP_STATUS_CODES } from "../controllers/httpStatusCodes/httpStatusCodes.enum";



export const validate = (schema : ZodSchema) => {
    return (
        req : Request,
        res : Response,
        next : NextFunction
    ) => {
        const result = schema.safeParse(req.body)
        if(!result.success){
            const path = result.error.issues[0].path[0].toString().split("_").join(" ").toUpperCase()
            const message = result.error.issues[0].message
            const errorMessage = `${path} : ${message}`
            throw new AppError(errorMessage,HTTP_STATUS_CODES.BAD_REQUEST)
        }

        req.body = result.data
        next()
    }
}