import { GetInstitutionAndRequestResponseDTO } from "../../../dtos/institution.dto";
import { Result } from "../../../helpers/result";

export interface IGetInstitutionAndRequestUseCase {
    execute : (_id : string) => Promise<Result<GetInstitutionAndRequestResponseDTO>>
}