import { SortBy } from "../../../../domain/enums/sortBy.enum";
import { IRequestRepository } from "../../../../domain/repositories/request.repository";
import { IRequestDocument } from "../../../../infrastructure/mongodb/models/request.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { GetRequestsResponseDTO } from "../../../dtos/request.dto";
import { Result } from "../../../helpers/result";
import { IGetRequestsUseCase } from "./IGetRequests.usecase";

export class GetRequestsUseCase implements IGetRequestsUseCase {
  constructor(private readonly _requestRepository: IRequestRepository) {}
  async execute(
    page: number,
    itemsPerPage: number,
    search?: string
  ): Promise<Result<GetRequestsResponseDTO>> {
    const requestsLength = (await this._requestRepository.getAll(SortBy.NEWEST)).length;
    const startIndex = (page - 1) * itemsPerPage;
    const requests = await this._requestRepository.getAll(
      SortBy.NEWEST,
      startIndex,
      itemsPerPage,
      search
    );
    const totalPages = Math.ceil(requestsLength / itemsPerPage);
    return Result.success<GetRequestsResponseDTO>(
      {
        documents: requests,
        totalPages,
      },
      HTTP_STATUS_CODES.OK
    );
  }
}
