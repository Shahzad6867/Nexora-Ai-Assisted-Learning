import { ICourseDocument } from "../../../../infrastructure/mongodb/models/course.model";
import { GetCourseResponseDTO } from "../../../dtos/course.dto";
import { Result } from "../../../helpers/result";

export interface IGetCourseUseCase {
    execute : (_id : string) => Promise<Result<GetCourseResponseDTO>>
}