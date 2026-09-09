import { IInstructorDocument } from "../../../../infrastructure/mongodb/models/instructor.model";
import { Result } from "../../../helpers/result";

export interface IGetInstructorUseCase {
    execute : (instructor_id : string) => Promise<Result<IInstructorDocument | null>>
}