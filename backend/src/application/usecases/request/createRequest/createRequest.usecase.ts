import { Request } from "../../../../domain/entities/request.entity";
import { IdPrefix } from "../../../../domain/enums/idPrefix.enum";
import { RequestStatus } from "../../../../domain/enums/requestStatus.enum";
import { IRequestRepository } from "../../../../domain/repositories/request.repository";
import { IRequestDocument } from "../../../../infrastructure/mongodb/models/request.model";
import { CreateRequestDTO } from "../../../dtos/request.dto";
import { IEntityIdGenerator } from "../../../interfaces/IEntityIdGenerator.interface";
import { Result } from "../../../helpers/result";
import { ICreateRequestUseCase } from "./ICreateRequest.usecase";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";

export class CreateRequestUseCase implements ICreateRequestUseCase {
  constructor(
    private readonly _requestRepository: IRequestRepository,
    private readonly _requestIdGenerator: IEntityIdGenerator
  ) {}
  async execute(dto: CreateRequestDTO) {
    const request_id = this._requestIdGenerator.generate(IdPrefix.REQUEST);
    const now = new Date();
    const request = new Request(
      request_id,
      dto.request_type,
      dto.submitted_by,
      now,
      false,
      [{ status: RequestStatus.SUBMITTED, timestamp: now, note: dto?.note }]
    );
    await this._requestRepository.create(request);
    return Result.success<Request>(request, HTTP_STATUS_CODES.CREATED);
  }
}
