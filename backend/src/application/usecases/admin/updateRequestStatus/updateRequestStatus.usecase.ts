import { Request } from "../../../../domain/entities/request.entity";
import { IInstitutionRepository } from "../../../../domain/repositories/institution.repository";
import { IRequestRepository } from "../../../../domain/repositories/request.repository";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { UpdateRequestDTO } from "../../../dtos/request.dto";
import { Result } from "../../../helpers/result";
import { REQUEST_MESSAGES } from "../../request/request.usecase.messages";
import { IUpdateRequestStatusUseCase } from "./IUpdateRequestStatus.usecase";

export class UpdateRequestStatusUseCase implements IUpdateRequestStatusUseCase {
  constructor(
    private readonly _requestRepository: IRequestRepository,
    private readonly _institutionRepository: IInstitutionRepository
  ) {}
  async execute(dto: UpdateRequestDTO) : Promise<Result<string>>{
    const request = await this._requestRepository.getById(dto.request_id);
    if (request === null) {
      throw new AppError(REQUEST_MESSAGES.NOT_FOUND, HTTP_STATUS_CODES.NOT_FOUND);
    }

    const status_obj = {
      status: dto.status_type,
      timestamp: new Date(),
      note: dto.status_note,
    };
    request.status_timeline.push(status_obj);

    const updatedRequest = new Request(
      request.request_id,
      request.request_type,
      request.submitted_by,
      request.submitted_on,
      dto.status_type === "Approved" ? true : false,
      request.status_timeline
    );

    await this._requestRepository.update(updatedRequest.request_id,updatedRequest);
    dto.status_type === "Approved" &&
      (await this._institutionRepository.update(request.submitted_by, {
        isVerified: true,
      }));

    return Result.success(request.submitted_by, HTTP_STATUS_CODES.OK);
  }
}
