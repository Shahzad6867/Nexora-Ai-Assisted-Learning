import { GoogleAuthResponseDTO, GoogleUserDTO } from "../../../dtos/user.dto";
import { Result } from "../../../helpers/result";

export interface IGoogleAuthBeforeDobUseCase {
    execute : (dto : GoogleUserDTO) => Promise<Result<GoogleAuthResponseDTO>>
}