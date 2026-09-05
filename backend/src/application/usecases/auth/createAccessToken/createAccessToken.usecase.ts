import env from "../../../../config/env.config";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { Result } from "../../../helpers/result";
import { ICreateAccessTokenUseCase} from "./ICreateAccessToken.usecase";
import jwt from "jsonwebtoken";

interface CustomJWTPayload  extends jwt.JwtPayload{
  _id : string,
  role : string
}
export class CreateAccessTokenUseCase implements ICreateAccessTokenUseCase {
  async execute(refreshToken?: string): Promise<Result<string>> {
    try {
      if(!refreshToken){
        throw new AppError("Refresh token missing, Please log in",HTTP_STATUS_CODES.UNAUTHORIZED)
      }
      const expiresIn = env.JWT_ACCESS_EXPIRES_IN as any;
      const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET_KEY) as CustomJWTPayload
      const accessToken = jwt.sign({
        _id : payload._id,
        role : payload.role
      }, env.JWT_ACCESS_SECRET_KEY, {
        expiresIn,
      });
      console.log("New Access Token created")
      return Result.success(accessToken, HTTP_STATUS_CODES.CREATED);
    } catch (error : any) {
      if(error instanceof jwt.TokenExpiredError){
        throw new AppError("Session expired - Please login",HTTP_STATUS_CODES.UNAUTHORIZED)
      }
      throw new AppError(error.message,HTTP_STATUS_CODES.FORBIDDEN)
    }
  }
}
