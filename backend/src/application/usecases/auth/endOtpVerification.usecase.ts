import env from "../../../config/env.config";
import { IOtpRepository } from "../../../domain/repositories/otp.respository";
import { RegisterInstitutionDTO } from "../../dtos/institution.dto";
import { VerifyOtpRequestDTO } from "../../dtos/otp.dto";
import { RegisterUserDTO, RegisterUserResponseDTO } from "../../dtos/user.dto";
import { IMailService } from "../../interfaces/IMailService.interface";
import { RegisterInstitutionUseCase } from "./registerInstitution.usecase";
import { RegisterUserUseCase } from "./registerUser.usecase";
import jwt from "jsonwebtoken"

export class EndOtpVerificationUseCase {
  constructor(
    private readonly otpRepository: IOtpRepository,
    private readonly registerInstitutionUseCase: RegisterInstitutionUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly mailService: IMailService
  ) {}
  async execute(
    dto: VerifyOtpRequestDTO
  ): Promise<RegisterUserResponseDTO | string> {
    const otpDetails = await this.otpRepository.findById(dto.otpDetails._id);

    if (otpDetails === null) {
      throw new Error(
        "Registration details has been expired!, Please register once again"
      );
    }

    if (otpDetails.otp !== dto.otpTyped) {
      throw new Error("Incorrect OTP");
    }
    if (otpDetails.otpExpiresAt < new Date()) {
      throw new Error(
        "OTP Expired, Please click 'Resend OTP' to get a new OTP"
      );
    }
    let response = null
    if (otpDetails.data.role === "student") {
      response = await this.registerUserUseCase.execute(
        otpDetails.data as RegisterUserDTO
      );
      await this.mailService.sendAccountVerified(otpDetails.data.email);
    } else {
      response = await this.registerInstitutionUseCase.execute(
        otpDetails.data as RegisterInstitutionDTO
      );
    }
    await this.otpRepository.delete(dto.otpDetails._id);

    const token = jwt.sign({_id : response, role : otpDetails.data.role},env.JWT_SECRET_KEY!,{expiresIn : "3h"})

    return token
  }
}
