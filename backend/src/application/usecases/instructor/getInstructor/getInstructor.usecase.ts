import { IInstructorRepository } from "../../../../domain/repositories/instructor.repository";
import { IInstructorDocument } from "../../../../infrastructure/mongodb/models/instructor.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { Result } from "../../../helpers/result";
import { INSTRUCTOR_MESSAGES } from "../instructor.usecase.messages";
import { IGetInstructorUseCase } from "./IGetInstructor.usecase";


export class GetInstructorUseCase implements IGetInstructorUseCase {
  constructor(
    private readonly _instructorRespository: IInstructorRepository,
  ) {}
  async execute(instructor_id : string) : Promise<Result<IInstructorDocument | null>> {
    const instructor = await this._instructorRespository.getById(instructor_id)
    if(!instructor){
      throw new AppError(INSTRUCTOR_MESSAGES.NOT_FOUND,HTTP_STATUS_CODES.NOT_FOUND)
    }
    return Result.success<IInstructorDocument>(instructor, HTTP_STATUS_CODES.OK);
  }
}
