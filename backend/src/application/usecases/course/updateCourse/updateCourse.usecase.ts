import { Course } from "../../../../domain/entities/course.entity";
import { ICourseRepository } from "../../../../domain/repositories/course.repository";
import { ICourseDocument } from "../../../../infrastructure/mongodb/models/course.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { UpdateCourseRequestDTO } from "../../../dtos/course.dto";
import { Result } from "../../../helpers/result";
import { COURSE_MESSAGES } from "../course.usecase.messages";
import { IUpdateCourseUseCase } from "./IUpdateCourse.usecase";

export class UpdateCourseUseCase implements IUpdateCourseUseCase {
    constructor(
        private readonly _courseRepository : ICourseRepository
    ){}
    async execute(course_id : string,dto : UpdateCourseRequestDTO) : Promise<Result<ICourseDocument | null>> {
        const courseToBeUpdated = await this._courseRepository.getById(course_id)
        if(!courseToBeUpdated){
            throw new AppError(COURSE_MESSAGES.NOT_FOUND,HTTP_STATUS_CODES.NOT_FOUND)
        }
        const course  = new Course(
            courseToBeUpdated.institution_id,
            courseToBeUpdated.course_id,
            dto.course_name,
            dto.course_subtitle,
            dto.description,
            dto.course_category,
            courseToBeUpdated.course_banner,
            dto.price,
            dto.price_per_module,
            courseToBeUpdated.is_archived,
            courseToBeUpdated.is_published,
            courseToBeUpdated.is_approved
        )

        const updatedCourse = await this._courseRepository.update(course_id,course)
        return Result.success(updatedCourse,HTTP_STATUS_CODES.OK)
    }
}