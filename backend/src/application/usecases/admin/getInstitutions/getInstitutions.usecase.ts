import { SortBy } from "../../../../domain/enums/sortBy.enum";
import { IInstitutionRepository } from "../../../../domain/repositories/institution.repository";
import { IInstitutionDocument } from "../../../../infrastructure/mongodb/models/institution.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { getInstitutionsResponseDTO } from "../../../dtos/institution.dto";
import { Result } from "../../../helpers/result";
import { IGetInstitutionsUseCase } from "./IGetInstitutions.usecase";

export class GetInstitutionsUseCase implements IGetInstitutionsUseCase {
  constructor(
    private readonly _institutionRepository: IInstitutionRepository
  ) {}
  async execute(
    page: number,
    itemsPerPage: number,
    sortBy: SortBy,
    search?: string
  ): Promise<Result<getInstitutionsResponseDTO>> {
    const institutionsLength = (
      await this._institutionRepository.getAll(sortBy)
    ).length;
    const startIndex = (page - 1) * itemsPerPage;
    const institutions = await this._institutionRepository.getAll(
      sortBy,
      startIndex,
      itemsPerPage,
      search
    );
    const totalPages = Math.ceil(institutionsLength / itemsPerPage);
    return Result.success<getInstitutionsResponseDTO>(
      { documents: institutions, totalPages },
      HTTP_STATUS_CODES.OK
    );
  }
}
