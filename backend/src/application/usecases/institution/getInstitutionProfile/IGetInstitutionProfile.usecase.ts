import { IInstitutionDocument } from "../../../../infrastructure/mongodb/models/institution.model";
import { GetInstitutionProfileDTO } from "../../../dtos/institution.dto";
import { Result } from "../../../helpers/result";

export interface IGetInstitutionProfileUseCase {
  execute: (
    dto: GetInstitutionProfileDTO
  ) => Promise<Result<IInstitutionDocument>>;
}
