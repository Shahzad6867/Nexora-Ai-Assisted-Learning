import { IInstitutionDocument } from "../../../../infrastructure/mongodb/models/institution.model";
import {
  BasicInformationDTO,
  InstitutionAddressDTO,
  LegalInformationDTO,
  PrimaryContactDTO,
} from "../../../dtos/institution.dto";
import { Result } from "../../../helpers/result";

export interface IUpdateInstitutionProfileUseCase {
  execute: (
    _id: string,
    dto:
      | BasicInformationDTO
      | PrimaryContactDTO
      | InstitutionAddressDTO
      | LegalInformationDTO
  ) => Promise<Result<IInstitutionDocument>>;
}
