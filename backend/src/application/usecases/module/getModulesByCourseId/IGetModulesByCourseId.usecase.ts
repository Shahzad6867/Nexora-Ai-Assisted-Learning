import { IModuleDocument } from "../../../../infrastructure/mongodb/models/module.model";
import { Result } from "../../../helpers/result";

export interface IGetModulesByCourseIdUseCase {
    execute : (course_id : string) => Promise<Result<IModuleDocument[]>>
}