import env from "../../../../config/env.config";
import { Roles } from "../../../../domain/enums/roles.enum";
import { IOtpRepository } from "../../../../domain/repositories/otp.respository";
import { AppError } from "../../../../presentation/error/app.error";
import { RegisterInstitutionDTO } from "../../../dtos/institution.dto";
import { TokenResponseDTO, VerifyOtpRequestDTO } from "../../../dtos/otp.dto";
import {
  RegisterUserDTO,
} from "../../../dtos/user.dto";
import { IMailService } from "../../../interfaces/IMailService.interface";
import { Result } from "../../../helpers/result";
import jwt from "jsonwebtoken";
import { IEndOtpVerificationUseCase } from "./IEndOtpVerification.usecase";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { IRegisterInstitutionUseCase } from "../registerInstitution/IRegisterInstitution.usecase";
import { IRegisterUserUseCase } from "../registerUser/IRegisterUser.usecase";
import { AUTH_USECASE_MESSAGES } from "../auth.usecase.messages";
import { ITokenGenerator } from "../../../interfaces/ITokenGenerator.interface";

export class EndOtpVerificationUseCase implements IEndOtpVerificationUseCase {
  constructor(
    private readonly _otpRepository: IOtpRepository,
    private readonly _registerInstitutionUseCase: IRegisterInstitutionUseCase,
    private readonly _registerUserUseCase: IRegisterUserUseCase,
    private readonly _mailService: IMailService,
    private readonly _tokenGenerator : ITokenGenerator
  ) {}
  async execute(dto: VerifyOtpRequestDTO): Promise<Result<TokenResponseDTO>> {
    const otpDetails = await this._otpRepository.findById(dto.otpDetails._id);

    if (otpDetails === null) {
      throw new AppError(
        AUTH_USECASE_MESSAGES.REGISTERATION_DETAILS_EXPIRED,
        HTTP_STATUS_CODES.GONE
      );
    }

    if (otpDetails.otp !== dto.otpTyped) {
      throw new AppError("Incorrect OTP", 401);
    }
    if (otpDetails.otpExpiresAt < new Date()) {
      throw new AppError(
        AUTH_USECASE_MESSAGES.OTP_EXPIRED,
        HTTP_STATUS_CODES.GONE
      );
    }
    let response = null;
    if (otpDetails.data.role === Roles.STUDENT) {
      response = await this._registerUserUseCase.execute(
        otpDetails.data as RegisterUserDTO
      );
      await this._mailService.sendAccountVerified(otpDetails.data.email);
    } else {
      response = await this._registerInstitutionUseCase.execute(
        otpDetails.data as RegisterInstitutionDTO
      );
    }
    await this._otpRepository.delete(dto.otpDetails._id);
    const accessToken = this._tokenGenerator.generateAccessToken({ _id : response,role : otpDetails.data.role})
    const refreshToken = this._tokenGenerator.generateRefreshToken({ _id : response,role : otpDetails.data.role})
    return Result.success({
      accessToken,
      refreshToken
    }, HTTP_STATUS_CODES.CREATED);
  }
}
