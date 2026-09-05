import { Course } from "../../../../domain/entities/course.entity";
import { CreateCourseRequestDTO } from "../../../dtos/course.dto";
import { Result } from "../../../helpers/result";

export interface ICreateCourseUseCase {
    execute : (dto : CreateCourseRequestDTO ) => Promise<Result<Course>>
}