import { IOtpRepository } from "../../../../domain/repositories/otp.respository";
import { AppError } from "../../../../presentation/error/app.error";
import { OtpResponseDTO, ResendOtpRequestDTO } from "../../../dtos/otp.dto";
import { IMailService } from "../../../interfaces/IMailService.interface";
import { IOtpGenerator } from "../../../interfaces/IOtpGenerator.interface";
import { Result } from "../../../helpers/result";
import { IUpdateAndResendOtpUseCase } from "./IUpdateAndResendOtp.usecase";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import env from "../../../../config/env.config";
import { AUTH_USECASE_MESSAGES } from "../auth.usecase.messages";

export class UpdateAndResendOtpUseCase implements IUpdateAndResendOtpUseCase {
  constructor(
    private readonly _registrationRepository: IOtpRepository,
    private readonly _otpGenerator: IOtpGenerator,
    private readonly _mailService: IMailService
  ) {}
  async execute(dto: ResendOtpRequestDTO) {
    const otpDetails = await this._registrationRepository.findById(dto._id);

    if (otpDetails === null) {
      throw new AppError(
        AUTH_USECASE_MESSAGES.REGISTERATION_DETAILS_EXPIRED,
        HTTP_STATUS_CODES.GONE
      );
    }
    const newOtpDetails = this._otpGenerator.generate();
    otpDetails.otp = newOtpDetails.otp;
    otpDetails.otpExpiresAt = newOtpDetails.otpExpiresAt;
    await this._registrationRepository.save(otpDetails, env.REDIS_AUTH_DOCUMENT_EXPIRES_IN);
    await this._mailService.sendOtp(otpDetails.data.email, otpDetails.otp);

    const otpResponseDTO: OtpResponseDTO = {
      _id: otpDetails._id,
      otp: otpDetails.otp,
      otpExpiresAt: otpDetails.otpExpiresAt,
    };
    return Result.success<OtpResponseDTO>(otpResponseDTO, HTTP_STATUS_CODES.OK);
  }
}
