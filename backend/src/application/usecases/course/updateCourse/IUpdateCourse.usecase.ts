import { ICourseDocument } from "../../../../infrastructure/mongodb/models/course.model";
import { UpdateCourseRequestDTO } from "../../../dtos/course.dto";
import { Result } from "../../../helpers/result";

export interface IUpdateCourseUseCase {
    execute : (course_id : string,dto : UpdateCourseRequestDTO) => Promise<Result<ICourseDocument | null>>
}