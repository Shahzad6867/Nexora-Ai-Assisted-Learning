import { ISubjectDocument } from "../../../../infrastructure/mongodb/models/subject.model";
import { UpdateSubjectRequestDTO } from "../../../dtos/subject.dto";
import { Result } from "../../../helpers/result";

export interface IUpdateSubjectUseCase {
    execute : (subject_id : string,dto : UpdateSubjectRequestDTO) => Promise<Result<ISubjectDocument | null>>
}