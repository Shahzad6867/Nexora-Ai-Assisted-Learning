import { TokenResponseDTO } from "../../../dtos/otp.dto";
import { GoogleUserDobDTO } from "../../../dtos/user.dto";
import { Result } from "../../../helpers/result";

export interface IGoogleAuthAfterDobUseCase {
    execute : (dto: GoogleUserDobDTO) => Promise<Result<TokenResponseDTO>>
}