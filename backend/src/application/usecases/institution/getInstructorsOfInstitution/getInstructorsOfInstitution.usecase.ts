import { IInstructorRepository } from "../../../../domain/repositories/instructor.repository";
import { IInstructorDocument } from "../../../../infrastructure/mongodb/models/instructor.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { Result } from "../../../helpers/result";
import { IGetInstructorsOfInstitutionUseCase } from "./IGetInstructorsOfInstitution.usecase";

export class GetInstructorsOfInstitutionUseCase
  implements IGetInstructorsOfInstitutionUseCase
{
  constructor(private readonly _instructorRepository: IInstructorRepository) {}
  async execute(_id: string): Promise<Result<IInstructorDocument[]>> {
    const instructors = await this._instructorRepository.getByInstitutionId(
      _id
    );
    return Result.success<IInstructorDocument[]>(
      instructors,
      HTTP_STATUS_CODES.OK
    );
  }
}
