import { Result } from "../../../helpers/result";

export interface ICreateAccessTokenUseCase {
    execute : (refreshToken ?: string) => Promise<Result<string>>
}