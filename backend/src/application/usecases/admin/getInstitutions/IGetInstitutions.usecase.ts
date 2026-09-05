import { SortBy } from "../../../../domain/enums/sortBy.enum";
import { IInstitutionDocument } from "../../../../infrastructure/mongodb/models/institution.model";
import { getInstitutionsResponseDTO } from "../../../dtos/institution.dto";
import { Result } from "../../../helpers/result";

export interface IGetInstitutionsUseCase {
  execute: (
    page: number,
    itemsPerPage: number,
    sortBy: SortBy,
    search?: string
  ) => Promise<Result<getInstitutionsResponseDTO>>;
}
