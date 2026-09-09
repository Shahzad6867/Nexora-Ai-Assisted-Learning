import { ISubjectDocument } from "../../../../infrastructure/mongodb/models/subject.model";
import { GetSubjectResponseDTO } from "../../../dtos/subject.dto";
import { Result } from "../../../helpers/result";

export interface IGetSubjectUseCase {
    execute : (subject_id : string) => Promise<Result<GetSubjectResponseDTO>>
}