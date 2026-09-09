import { ICourseRepository } from "../../../../domain/repositories/course.repository";
import { IModuleRepository } from "../../../../domain/repositories/module.repository";
import { ISubjectRepository } from "../../../../domain/repositories/subject.repository";
import { ICourseDocument } from "../../../../infrastructure/mongodb/models/course.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { GetCourseResponseDTO } from "../../../dtos/course.dto";
import { Result } from "../../../helpers/result";
import { COURSE_MESSAGES } from "../course.usecase.messages";
import { IGetCourseUseCase } from "./IGetCourse.usecase";

export class GetCourseUseCase implements IGetCourseUseCase {
    constructor(
        private readonly _courseRepository : ICourseRepository,
        private readonly _moduleRepository : IModuleRepository,
        private readonly _subjectRepository : ISubjectRepository,
    ){}
    async execute(_id : string) : Promise<Result<GetCourseResponseDTO>> {
        const course = await this._courseRepository.getById(_id)
        if(!course){
            throw new AppError(COURSE_MESSAGES.NOT_FOUND,HTTP_STATUS_CODES.NOT_FOUND)
        }
        const modules = await this._moduleRepository.getModulesByCourseId(course.course_id)
        const modulesWithSubjects = await Promise.all(
            modules.map(async (module) => {
              const subjectsResult = await this._subjectRepository.getSubjectsByModuleId(module.module_id);
              return {
                module_id : module.module_id,
                module_name : module.module_name,
                description : module.description,
                passing_marks : module.passing_marks,
                total_marks : module.total_marks,
                assignment_required : module.assignment_required,
                subjects: subjectsResult
              };
            })
        )
        const result : GetCourseResponseDTO = {
            institution_id : course.institution_id,
            course_banner : course.course_banner,
            course_category : course.course_category,
            course_name : course.course_name,
            course_id : course.course_id,
            course_subtitle : course.course_subtitle,
            createdAt : course.createdAt,
            description : course.description,
            is_approved : course.is_approved,
            is_archived : course.is_archived,
            is_published : course.is_published,
            price : course.price,
            price_per_module : course.price_per_module,
            updatedAt : course. updatedAt,
            modules : modulesWithSubjects ?? []
          }
          
        return Result.success<GetCourseResponseDTO>(result,HTTP_STATUS_CODES.OK)
    }
}