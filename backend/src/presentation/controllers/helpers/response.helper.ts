import { Response } from "express";
import { ApiFailureResponse, ApiSuccessResponse } from "../../../application/interfaces/api/ApiResponse.interface";


export class ResponseHelper {
    static success<T>(
        res : Response,
        data : T,
        message : string,
        statusCode : number
    ) : Response {
        const response : ApiSuccessResponse<T> = {
            success : true,
            data,
            message,
            statusCode
        }
        return res.status(statusCode).json(response)
    }

    static failure<T>(
        res : Response,
        message : string,
        statusCode : number
    )  {
        const response : ApiFailureResponse = {
            success : false,
            error : message,
            statusCode
        } 
        return res.status(statusCode).json(response)
    }
}