import { TokenResponseDTO, VerifyOtpRequestDTO } from "../../../dtos/otp.dto";
import { Result } from "../../../helpers/result";

export interface IEndOtpVerificationUseCase {
    execute : (dto: VerifyOtpRequestDTO) => Promise<Result<TokenResponseDTO>>
}