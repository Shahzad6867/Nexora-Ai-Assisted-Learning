import env from "../../../../config/env.config";
import { Roles } from "../../../../domain/enums/roles.enum";
import { IInstitutionRepository } from "../../../../domain/repositories/institution.repository";
import { IOtpRepository } from "../../../../domain/repositories/otp.respository";
import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { OtpGenerator } from "../../../../infrastructure/adapters/OtpGenerator.adapter";
import { AppError } from "../../../../presentation/error/app.error";
import {
  OtpResponseDTO,
  OtpEntity,
  RegisterOtpInstitutionDTO,
  RegisterOtpUserDTO,
} from "../../../dtos/otp.dto";
import { IDobAndAgeValidator } from "../../../interfaces/IDobAndAgeValidator.interface";
import { IMailService } from "../../../interfaces/IMailService.interface";
import { IPassswordAdapter } from "../../../interfaces/IPasswordAdapter.interface";
import { Result } from "../../../helpers/result";
import { IStartOtpVerificationUseCase } from "./IStartOtpVerification.usecase";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AUTH_USECASE_MESSAGES } from "../auth.usecase.messages";
import { ILogger } from "../../../interfaces/ILogger";

export class StartOtpVerificationUseCase
  implements IStartOtpVerificationUseCase
{
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _institutionRepository: IInstitutionRepository,
    private readonly _otpRepository: IOtpRepository,
    private readonly _dobAndAgeValidator: IDobAndAgeValidator,
    private readonly _passwordAdapter: IPassswordAdapter,
    private readonly _otpGenerator: OtpGenerator,
    private readonly _mailService: IMailService
  ) {}
  async execute(
    dto: RegisterOtpUserDTO | RegisterOtpInstitutionDTO
  ): Promise<Result<OtpResponseDTO>> {
    const userExist = await this._otpRepository.findById(dto.email);
    if (userExist !== null) {
      await this._otpRepository.delete(dto.email);
    }

    if (dto.role === Roles.STUDENT) {
      const existingUser = await this._userRepository.getByEmail(dto.email);
      if (existingUser) {
        throw new AppError(AUTH_USECASE_MESSAGES.USER_ALREADY_EXISTS, 400);
      }
      const isDobValid = this._dobAndAgeValidator.validate(
        dto.date_of_birth,
        dto.age
      );
      if (!isDobValid) {
        throw new AppError(
          AUTH_USECASE_MESSAGES.INVALID_DOB,
          HTTP_STATUS_CODES.BAD_REQUEST
        );
      }
    } else if (dto.role === Roles.INSTITUTION) {
      const existingInstitution = await this._institutionRepository.getByEmail(
        dto.email
      );
      if (existingInstitution) {
        throw new AppError(
          AUTH_USECASE_MESSAGES.INSTITUTION_ALREADY_EXISTS,
          HTTP_STATUS_CODES.CONFLICT
        );
      }
    }

    const hash = await this._passwordAdapter.hash(dto.password);

    const newOtpDetails = this._otpGenerator.generate();

    dto.password = hash;

    const otpEntity: OtpEntity = {
      _id: dto.email,
      data: dto,
      otp: newOtpDetails.otp,
      otpExpiresAt: newOtpDetails.otpExpiresAt,
    };
    await this._otpRepository.save(
      otpEntity,
      env.REDIS_AUTH_DOCUMENT_EXPIRES_IN
    );
    await this._mailService.sendOtp(dto.email, newOtpDetails.otp);

    const otpResponseDTO: OtpResponseDTO = {
      _id: otpEntity._id,
      otp: otpEntity.otp,
      otpExpiresAt: otpEntity.otpExpiresAt,
    };

    return Result.success<OtpResponseDTO>(otpResponseDTO, HTTP_STATUS_CODES.OK);
  }
}
