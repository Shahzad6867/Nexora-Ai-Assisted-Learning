import { IOtpRepository } from "../../../domain/repositories/otp.respository";
import { OtpResponseDTO, ResendOtpRequestDTO } from "../../dtos/otp.dto";
import { IMailService } from "../../interfaces/IMailService.interface";
import { IOtpGenerator } from "../../interfaces/IOtpGenerator.interface";

export class UpdateAndResendOtpUseCase {
  constructor(
    private readonly registrationRepository: IOtpRepository,
    private readonly otpGenerator: IOtpGenerator,
    private readonly mailService: IMailService
  ) {}
  async execute(dto: ResendOtpRequestDTO): Promise<OtpResponseDTO> {
    const otpDetails = await this.registrationRepository.findById(dto._id);

    if (otpDetails === null) {
      throw new Error(
        "Registration details has been expired!, Please register once again"
      );
    }
    const newOtpDetails = this.otpGenerator.generate();
    otpDetails.otp = newOtpDetails.otp;
    otpDetails.otpExpiresAt = newOtpDetails.otpExpiresAt;
    await this.registrationRepository.save(otpDetails, 600);
    await this.mailService.sendOtp(otpDetails.data.email, otpDetails.otp);

    return {
      _id: otpDetails._id,
      otp: otpDetails.otp,
      otpExpiresAt: otpDetails.otpExpiresAt,
    };
  }
}
