import { Course } from "../../../../domain/entities/course.entity";
import { ICourseDocument } from "../../../../infrastructure/mongodb/models/course.model";
import { CreateCourseRequestDTO } from "../../../dtos/course.dto";
import { Result } from "../../../helpers/result";

export interface IGetCoursesOfInstituionUseCase {
    execute : (institution_id : string ) => Promise<Result<ICourseDocument[]>>
}