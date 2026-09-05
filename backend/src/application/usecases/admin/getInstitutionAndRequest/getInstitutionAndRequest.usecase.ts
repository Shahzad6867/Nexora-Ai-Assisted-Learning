import { RequestTypes } from "../../../../domain/enums/requestTypes.enum";
import { IInstitutionRepository } from "../../../../domain/repositories/institution.repository";
import { IRequestRepository } from "../../../../domain/repositories/request.repository";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { GetInstitutionAndRequestResponseDTO } from "../../../dtos/institution.dto";
import { Result } from "../../../helpers/result";
import { INSTITUTION_MESSAGES } from "../../institution/institution.usecase.messages";
import { IGetInstitutionAndRequestUseCase } from "./IGetInstitutionAndRequest";
export class GetInstitutionAndRequestUseCase implements IGetInstitutionAndRequestUseCase {
  constructor(
    private readonly _institutionRepository: IInstitutionRepository,
    private readonly _requestRepository: IRequestRepository
  ) {}
  async execute(
    _id: string
  ): Promise<Result<GetInstitutionAndRequestResponseDTO>> {
    const institution = await this._institutionRepository.getById(_id);
    if (institution === null) {
      throw new AppError(INSTITUTION_MESSAGES.NOT_FOUND, HTTP_STATUS_CODES.NOT_FOUND);
    }
    const request = await this._requestRepository.getBySubmittedEntity(
      institution.institution_id,
      RequestTypes.INSTITUTION_ONBOARDING,
      false
    );
    return Result.success<GetInstitutionAndRequestResponseDTO>(
      {
        institution,
        request,
      },
      201
    );
  }
}
