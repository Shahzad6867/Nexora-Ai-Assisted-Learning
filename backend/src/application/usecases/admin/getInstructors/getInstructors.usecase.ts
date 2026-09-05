import { SortBy } from "../../../../domain/enums/sortBy.enum";
import { IInstructorRepository } from "../../../../domain/repositories/instructor.repository";
import { IInstructorDocument } from "../../../../infrastructure/mongodb/models/instructor.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { GetInstructorsResponseDTO } from "../../../dtos/instructor.dto";
import { Result } from "../../../helpers/result";
import { IGetInstructorsUseCase } from "./IGetInstructors.usecase";

export class GetInstructorsUseCase implements IGetInstructorsUseCase {
  constructor(private readonly _instructorRepository: IInstructorRepository) {}
  async execute(
    page: number,
    itemsPerPage: number,
    sortBy: SortBy,
    search?: string
  ): Promise<Result<GetInstructorsResponseDTO>> {
    const instructorsLength = (await this._instructorRepository.getAll(sortBy))
      .length;

    const startIndex = (page - 1) * itemsPerPage;
    const instructors = await this._instructorRepository.getAll(
      sortBy,
      startIndex,
      itemsPerPage,
      search
    );
    const totalPages = Math.ceil(instructorsLength / itemsPerPage);
    return Result.success<GetInstructorsResponseDTO>(
      {
        documents: instructors,
        totalPages,
      },
      HTTP_STATUS_CODES.OK
    );
  }
}
