import { SortBy } from "../../../../domain/enums/sortBy.enum";
import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { IUserDocument } from "../../../../infrastructure/mongodb/models/user.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { GetUsersResponseDTO } from "../../../dtos/user.dto";
import { Result } from "../../../helpers/result";
import { IGetStudentsUseCase } from "./IGetStudents.usecase";

export class GetStudentsUseCase implements IGetStudentsUseCase {
  constructor(private readonly _userRepository: IUserRepository) {}
  async execute(
    page: number,
    itemsPerPage: number,
    sortBy: SortBy,
    search?: string
  ): Promise<Result<GetUsersResponseDTO>> {
    const studentsLength = (await this._userRepository.getAll(sortBy)).length;
    const startIndex = (page - 1) * itemsPerPage;
    const students = await this._userRepository.getAll(
      sortBy,
      startIndex,
      itemsPerPage,
      search
    );
    const totalPages = Math.ceil(studentsLength / itemsPerPage);
    return Result.success<GetUsersResponseDTO>(
      {
        documents: students,
        totalPages,
      },
      HTTP_STATUS_CODES.OK
    );
  }
}
