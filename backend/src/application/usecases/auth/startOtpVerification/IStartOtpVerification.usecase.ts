import { OtpResponseDTO, RegisterOtpInstitutionDTO, RegisterOtpUserDTO } from "../../../dtos/otp.dto";
import { Result } from "../../../helpers/result";

export interface IStartOtpVerificationUseCase {
  execute: (
    dto: RegisterOtpUserDTO | RegisterOtpInstitutionDTO
  ) => Promise<Result<OtpResponseDTO>>;
}
