import {
  BasicInformationDTO,
  BlockOrUnblockDTO,
  InstitutionAddressDTO,
  LegalInformationDTO,
  PrimaryContactDTO,
  VerifyInstitutionDTO,
} from "../../application/dtos/institution.dto";
import { IInstitutionDocument } from "../../infrastructure/mongodb/models/institution.model";
import { Institution } from "../entities/institution.entity";
import { SortBy } from "../enums/sortBy.enum";

export interface IInstitutionRepository {
  getById: (institution_id: string) => Promise<IInstitutionDocument | null>;
  getByEmail: (email: string) => Promise<IInstitutionDocument | null>;
  getAll: (
    sortBy: SortBy,
    skip?: number,
    itemsPerPage?: number,
    search?: string
  ) => Promise<IInstitutionDocument[]>;
  update: (
    _id: string,
    data:
      | BasicInformationDTO
      | PrimaryContactDTO
      | InstitutionAddressDTO
      | LegalInformationDTO
      | VerifyInstitutionDTO
      | BlockOrUnblockDTO
  ) => Promise<IInstitutionDocument | null>;
  create: (institution: Institution) => Promise<IInstitutionDocument>;
}
