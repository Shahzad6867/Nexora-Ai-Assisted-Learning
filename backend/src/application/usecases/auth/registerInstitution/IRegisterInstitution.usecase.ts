import { RegisterInstitutionDTO } from "../../../dtos/institution.dto";
import { Result } from "../../../helpers/result";

export interface IRegisterInstitutionUseCase {
    execute : (dto : RegisterInstitutionDTO ) => Promise<string>
}