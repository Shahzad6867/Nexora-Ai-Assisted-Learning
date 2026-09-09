import { ISubjectDocument } from "../../../../infrastructure/mongodb/models/subject.model";
import { Result } from "../../../helpers/result";

export interface IGetSubjectsByModuleId {
    execute : (module_id : string) => Promise<Result<ISubjectDocument[]>>
}