import { SortBy } from "../../../../domain/enums/sortBy.enum";
import { IUserDocument } from "../../../../infrastructure/mongodb/models/user.model";
import { GetUsersResponseDTO } from "../../../dtos/user.dto";
import { Result } from "../../../helpers/result";

export interface IGetStudentsUseCase {
  execute: (
    page: number,
    itemsPerPage: number,
    sortBy: SortBy,
    search?: string
  ) => Promise<Result<GetUsersResponseDTO>>;
}
