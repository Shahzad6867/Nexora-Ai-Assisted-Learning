import { ICourseRepository } from "../../../../domain/repositories/course.repository";
import { ICourseDocument } from "../../../../infrastructure/mongodb/models/course.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { Result } from "../../../helpers/result";
import { IGetCoursesOfInstituionUseCase } from "./IGetCoursesOfInstitution.usecase";

export class GetCoursesOfInstituionUseCase implements IGetCoursesOfInstituionUseCase {
  constructor(
    private readonly _courseRepository: ICourseRepository
  ) {}
  async execute(instituion_id : string): Promise<Result<ICourseDocument[]>> {
    const courses = await this._courseRepository.getCoursesByInstitutionId(instituion_id)
    return Result.success(courses, HTTP_STATUS_CODES.OK);
  }
}
