import { IInstitutionRepository } from "../../../../domain/repositories/institution.repository";
import { IInstitutionDocument } from "../../../../infrastructure/mongodb/models/institution.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { GetInstitutionProfileDTO } from "../../../dtos/institution.dto";
import { Result } from "../../../helpers/result";
import { INSTITUTION_MESSAGES } from "../institution.usecase.messages";
import { IGetInstitutionProfileUseCase } from "./IGetInstitutionProfile.usecase";

export class GetInstitutionProfileUseCase
  implements IGetInstitutionProfileUseCase
{
  constructor(
    private readonly _institutionRepository: IInstitutionRepository
  ) {}
  async execute(
    dto: GetInstitutionProfileDTO
  ): Promise<Result<IInstitutionDocument>> {
    const institution = await this._institutionRepository.getById(dto._id);
    if (!institution) {
      throw new AppError(
        INSTITUTION_MESSAGES.NOT_FOUND,
        HTTP_STATUS_CODES.NOT_FOUND
      );
    }
    return Result.success<IInstitutionDocument>(institution, HTTP_STATUS_CODES.OK);
  }
}
