import { OtpResponseDTO, ResendOtpRequestDTO } from "../../../dtos/otp.dto";
import { Result } from "../../../helpers/result";

export interface IUpdateAndResendOtpUseCase {
    execute : (dto : ResendOtpRequestDTO) => Promise<Result<OtpResponseDTO>>
}