import { IInstitutionRepository } from "../../../domain/repositories/institution.repository";
import { IOtpRepository } from "../../../domain/repositories/otp.respository";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { OtpGenerator } from "../../../infrastrucutre/adapters/OtpGenerator.adapter";
import {
  OtpResponseDTO,
  OtpEntity,
  RegisterOtpInstitutionDTO,
  RegisterOtpUserDTO,
} from "../../dtos/otp.dto";
import { IMailService } from "../../interfaces/IMailService.interface";
import { IPassswordAdapter } from "../../interfaces/IPasswordAdapter.interface";

export class StartOtpVerificationUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly institutionRepository: IInstitutionRepository,
    private readonly otpRepository: IOtpRepository,
    private readonly passwordAdapter : IPassswordAdapter,
    private readonly otpGenerator: OtpGenerator,
    private readonly mailService: IMailService
  ) {}
  async execute(
    dto: RegisterOtpUserDTO | RegisterOtpInstitutionDTO
  ): Promise<OtpResponseDTO> {
    const userExist = await this.otpRepository.findById(dto.email);
    if (userExist !== null) {
      await this.otpRepository.delete(dto.email);
    }

    if (dto.role === "student") {
      const existingUser = await this.userRepository.getByEmail(dto.email);
      if (existingUser) {
        throw new Error("User already exists,Please login");
      }
    } else if (dto.role === "institution") {
      const existingInstitution = await this.institutionRepository.getByEmail(
        dto.email
      );
      if (existingInstitution) {
        throw new Error("Institution already exists,Please login");
      }
    }

    const hash = await this.passwordAdapter.hash(dto.password);

    const newOtpDetails = this.otpGenerator.generate();

    dto.password = hash;

    const otpEntity: OtpEntity = {
      _id: dto.email,
      data: dto,
      otp: newOtpDetails.otp,
      otpExpiresAt: newOtpDetails.otpExpiresAt,
    };
    await this.otpRepository.save(otpEntity, 600);
    await this.mailService.sendOtp(dto.email, newOtpDetails.otp);

    return {
      _id: otpEntity._id,
      otp: otpEntity.otp,
      otpExpiresAt: otpEntity.otpExpiresAt,
    };
  }
}
