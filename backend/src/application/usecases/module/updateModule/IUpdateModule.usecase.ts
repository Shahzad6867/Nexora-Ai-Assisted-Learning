import { IModuleDocument } from "../../../../infrastructure/mongodb/models/module.model";
import { CreateModuleRequestDTO } from "../../../dtos/module.dto";
import { Result } from "../../../helpers/result";

export interface IUpdateModuleUseCase {
    execute : (module_id : string ,dto : CreateModuleRequestDTO) => Promise<Result<IModuleDocument | null>>
}