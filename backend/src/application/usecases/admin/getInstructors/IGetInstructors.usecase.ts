import { SortBy } from "../../../../domain/enums/sortBy.enum";
import { IInstructorDocument } from "../../../../infrastructure/mongodb/models/instructor.model";
import { GetInstructorsResponseDTO } from "../../../dtos/instructor.dto";
import { Result } from "../../../helpers/result";

export interface IGetInstructorsUseCase {
  execute: (
    page: number,
    itemsPerPage: number,
    sortBy: SortBy,
    search?: string
  ) => Promise<Result<GetInstructorsResponseDTO>>;
}
