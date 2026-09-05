import { OtpResponseDTO, ResendOtpRequestDTO, TokenResponseDTO } from "../../../dtos/otp.dto";
import { LoginCredentialsDTO } from "../../../dtos/user.dto";
import { Result } from "../../../helpers/result";

export interface IVerifyLoginCredentialsUseCase {
    execute : (dto : LoginCredentialsDTO) => Promise<Result<TokenResponseDTO>>
}