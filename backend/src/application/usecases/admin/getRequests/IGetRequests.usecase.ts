import { IRequestDocument } from "../../../../infrastructure/mongodb/models/request.model";
import { GetRequestsResponseDTO } from "../../../dtos/request.dto";
import { Result } from "../../../helpers/result";

export interface IGetRequestsUseCase {
  execute: (
    page: number,
    itemsPerPage: number,
    search?: string
  ) => Promise<Result<GetRequestsResponseDTO>>;
}
