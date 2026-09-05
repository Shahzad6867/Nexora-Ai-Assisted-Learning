import { Institution } from "../../../../domain/entities/institution.entity";
import { IInstitutionRepository } from "../../../../domain/repositories/institution.repository";
import { IInstitutionDocument } from "../../../../infrastructure/mongodb/models/institution.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import {
  BasicInformationDTO,
  InstitutionAddressDTO,
  LegalInformationDTO,
  PrimaryContactDTO,
} from "../../../dtos/institution.dto";
import { Result } from "../../../helpers/result";
import { INSTITUTION_MESSAGES } from "../institution.usecase.messages";
import { IUpdateInstitutionProfileUseCase } from "./IUpdateInstitutionProfile.usecase";

export class UpdateInstitutionProfileUseCase
  implements IUpdateInstitutionProfileUseCase
{
  constructor(
    private readonly _institutionRepository: IInstitutionRepository
  ) {}
  async execute(
    _id: string,
    dto:
      | BasicInformationDTO
      | PrimaryContactDTO
      | InstitutionAddressDTO
      | LegalInformationDTO
  ): Promise<Result<IInstitutionDocument>> {
    const updatedInstitution = await this._institutionRepository.update(
      _id,
      dto
    );
    if (!updatedInstitution) {
      throw new AppError(
        INSTITUTION_MESSAGES.NOT_FOUND,
        HTTP_STATUS_CODES.NOT_FOUND
      );
    }
    return Result.success<IInstitutionDocument>(
      updatedInstitution,
      HTTP_STATUS_CODES.OK
    );
  }
}
