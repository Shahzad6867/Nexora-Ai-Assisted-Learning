import { IDobAndAgeValidator } from "../../application/interfaces/IDobAndAgeValidator.interface";
import { ITokenGenerator } from "../../application/interfaces/ITokenGenerator.interface";
import jwt from "jsonwebtoken"
import env from "../../config/env.config";
export class TokenGenerator implements ITokenGenerator{
  generateAccessToken(payload: any) {
    const expiresIn = env.JWT_ACCESS_EXPIRES_IN as any
    return jwt.sign(payload,env.JWT_ACCESS_SECRET_KEY!,{expiresIn : expiresIn})
  };
  generateRefreshToken(payload: any) {
    const expiresIn = env.JWT_REFRESH_EXPIRES_IN as any
    return jwt.sign(payload,env.JWT_REFRESH_SECRET_KEY!,{expiresIn : expiresIn})
  };
}
