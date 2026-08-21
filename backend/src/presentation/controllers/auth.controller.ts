import { Request, Response } from "express";
import { StartOtpVerificationUseCase } from "../../application/usecases/auth/startOtpVerification.usecase";
import { EndOtpVerificationUseCase } from "../../application/usecases/auth/endOtpVerification.usecase";
import { UpdateAndResendOtpUseCase } from "../../application/usecases/auth/updateAndResendOtp.usecase";
import { GoogleAuthBeforeDobUseCase } from "../../application/usecases/auth/googleAuthBeforeDob.usecase";
import env from "../../config/env.config";
import { GoogleAuthAfterDobUseCase } from "../../application/usecases/auth/googleAuthAfterDob.usecase";
import { VerifyLoginCredentialsUseCase } from "../../application/usecases/auth/verifyLoginCredentials.usecase";

export class AuthController {
  constructor(
    private readonly startOtpVerificationUseCase: StartOtpVerificationUseCase,
    private readonly updateAndResendOtpUseCase: UpdateAndResendOtpUseCase,
    private readonly endOtpVerificationUseCase: EndOtpVerificationUseCase,
    private readonly googleAuthBeforeDobUseCase: GoogleAuthBeforeDobUseCase,
    private readonly googleAuthAfterDobUseCase: GoogleAuthAfterDobUseCase,
    private readonly verifyLoginCredentialsUseCase : VerifyLoginCredentialsUseCase
  ) {}

  async registerOtpEntity(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.startOtpVerificationUseCase.execute(req.body);
      res.status(201).json({
        success: true,
        message: "OTP has been sent to your provided email",
        data: result,
      });
    } catch (error) {
      let errorMessage = null;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(error);
      res.status(500).json({
        success: false,
        message: errorMessage ?? "Something went wrong",
      });
    }
  }

  async verifyOtpEntity(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.endOtpVerificationUseCase.execute(req.body);
      res.status(201).json({
        success: true,
        message: "OTP has been verified",
        token : response
      });
    } catch (error) {
      let errorMessage = null;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(error);
      res.status(500).json({
        success: false,
        message: errorMessage ?? "Something went wrong",
      });
    }
  }

  async resendOtp(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.updateAndResendOtpUseCase.execute(req.body);
      res.status(201).json({
        success: true,
        message: "OTP has been resend to your provided email",
        data: result,
      });
    } catch (error) {
      let errorMessage = null;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(error);
      res.status(500).json({
        success: false,
        message: errorMessage ?? "Something went wrong",
      });
    }
  }

  async googleCallback(req: Request, res: Response): Promise<void> {
    try {
      const googleUser = req.user;

      if (!googleUser) {
        res.status(401).json({
          message: "Google authentication failed",
        });
        return;
      }
      const redirectUrl = await this.googleAuthBeforeDobUseCase.execute(
        googleUser
      );
      res.redirect(redirectUrl!);
    } catch (error) {
      let errorMessage = null;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(error);
      res.redirect(`${env.FRONTEND_URL}student/register`);
    }
  }

  async verifyGoogleUserDob(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.googleAuthAfterDobUseCase.execute({
        _id: req.params.id,
        ...req.body,
      });
      res.status(201).json({
        success: true,
        message: "Google user has been registered",
        data: user,
      });
    } catch (error) {
      let errorMessage = null;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(error);
      res.redirect(`${env.FRONTEND_URL}/student/register`);
    }
  }

  async verifyLoginCredentials (req : Request , res : Response) : Promise<void> {
    try{
      const response = await this.verifyLoginCredentialsUseCase.execute(req.body)
      res.status(201).json({
        success : true,
        message : "Welcome to Nexora 👋",
        token : response
      })
    }catch(error){
      let errorMessage = null;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(error);
      res.status(500).json({
        success: false,
        message: errorMessage ?? "Something went wrong",
      });
    }
  }
}
