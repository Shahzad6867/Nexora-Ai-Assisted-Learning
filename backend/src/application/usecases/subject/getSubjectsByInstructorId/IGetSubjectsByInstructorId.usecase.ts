import { ISubjectDocument } from "../../../../infrastructure/mongodb/models/subject.model";
import { Result } from "../../../helpers/result";

export interface IGetSubjectsByInstructorIdUseCase {
    execute : (instructor_id : string) => Promise<Result<ISubjectDocument[]>>
}