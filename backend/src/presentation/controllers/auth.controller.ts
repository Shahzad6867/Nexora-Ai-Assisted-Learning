import { Request, Response } from "express";
import env from "../../config/env.config";
import { Roles } from "../../domain/enums/roles.enum";
import { ResponseHelper } from "./helpers/response.helper";
import { AppError } from "../error/app.error";
import { IStartOtpVerificationUseCase } from "../../application/usecases/auth/startOtpVerification/IStartOtpVerification.usecase";
import { IUpdateAndResendOtpUseCase } from "../../application/usecases/auth/updateAndResendOtp/IUpdateAndResendOtp.usecase";
import { IEndOtpVerificationUseCase } from "../../application/usecases/auth/endOtpVerification/IEndOtpVerification.usecase";
import { IGoogleAuthBeforeDobUseCase } from "../../application/usecases/auth/googleAuthBeforeDob/IGoogleAuthBeforeDob.usecase";
import { IGoogleAuthAfterDobUseCase } from "../../application/usecases/auth/googleAuthAfterDob/IGoogleAuthAfterDob.usecase";
import { IVerifyLoginCredentialsUseCase } from "../../application/usecases/auth/verifyLoginCredentials/IVerifyLoginCredentials.usecase";
import { ICreateAccessTokenUseCase } from "../../application/usecases/auth/createAccessToken/ICreateAccessToken.usecase";
import { HTTP_STATUS_CODES } from "./httpStatusCodes/httpStatusCodes.enum";

export class AuthController {
  constructor(
    private readonly _startOtpVerificationUseCase: IStartOtpVerificationUseCase,
    private readonly _updateAndResendOtpUseCase: IUpdateAndResendOtpUseCase,
    private readonly _endOtpVerificationUseCase: IEndOtpVerificationUseCase,
    private readonly _googleAuthBeforeDobUseCase: IGoogleAuthBeforeDobUseCase,
    private readonly _googleAuthAfterDobUseCase: IGoogleAuthAfterDobUseCase,
    private readonly _verifyLoginCredentialsUseCase: IVerifyLoginCredentialsUseCase,
    private readonly _createAccessTokenUseCase: ICreateAccessTokenUseCase
  ) {}

  async registerOtpEntity(req: Request, res: Response): Promise<void> {
    const result = await this._startOtpVerificationUseCase.execute(req.body);
    ResponseHelper.success(
      res,
      result.data,
      "OTP has been sent to your provided email",
      result.statusCode
    );
  }

  async verifyOtpEntity(req: Request, res: Response): Promise<void> {
    const result = await this._endOtpVerificationUseCase.execute(req.body);
    res.cookie("refreshToken", result.data?.refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/api/refresh",
    });
    ResponseHelper.success(
      res,
      result.data?.accessToken,
      "OTP has been verified",
      result.statusCode
    );
  }

  async resendOtp(req: Request, res: Response): Promise<void> {
    const result = await this._updateAndResendOtpUseCase.execute(req.body);
    ResponseHelper.success(
      res,
      result.data,
      "OTP has been resend to your provided email",
      result.statusCode
    );
  }

  async googleCallback(req: Request, res: Response): Promise<void> {
    try {
      const googleUser = req.user;

      if (!googleUser) {
        throw new AppError("Google authentication failed!", 404);
      }
      const result = await this._googleAuthBeforeDobUseCase.execute(googleUser);
      if (result.data?.refreshToken) {
        res.cookie("refreshToken", result.data.refreshToken, {
          httpOnly: true,
          secure: env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
          path: "/api/refresh",
        });
      }
      res.redirect(result.data?.url!);
    } catch (error) {
      res.redirect(`${env.FRONTEND_URL}/${Roles.STUDENT}/register`);
    }
  }

  async verifyGoogleUserDob(req: Request, res: Response): Promise<void> {
    try {
      const result = await this._googleAuthAfterDobUseCase.execute({
        _id: req.params.id,
        ...req.body,
      });
      res.cookie("refreshToken", result.data?.refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/api/refresh",
      });
      ResponseHelper.success(
        res,
        result.data?.accessToken,
        "Google user has been registered",
        result.statusCode
      );
    } catch (error) {
      res.redirect(`${env.FRONTEND_URL}/${Roles.STUDENT}/register`);
    }
  }

  async verifyLoginCredentials(req: Request, res: Response): Promise<void> {
    const result = await this._verifyLoginCredentialsUseCase.execute(req.body);
    res.cookie("refreshToken", result.data?.refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/api/refresh",
    });
    ResponseHelper.success(
      res,
      result.data?.accessToken,
      "Authenticated",
      result.statusCode
    );
  }

  async createAccessToken(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies?.refreshToken;
    const result = await this._createAccessTokenUseCase.execute(refreshToken);
    ResponseHelper.success(
      res,
      result.data,
      "Access Token created successfully",
      result.statusCode
    );
  }

  async logout (req : Request,res : Response) {
    res.clearCookie("refreshToken",{
      httpOnly : true,
      secure : env.NODE_ENV === "production",
      sameSite : "strict",
      path : "/api/refresh"
    })
    ResponseHelper.success(res,null,"Logged out",HTTP_STATUS_CODES.OK)
  }
}
