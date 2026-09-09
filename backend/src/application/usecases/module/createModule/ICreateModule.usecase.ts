import { IModuleDocument } from "../../../../infrastructure/mongodb/models/module.model";
import { CreateModuleRequestDTO } from "../../../dtos/module.dto";
import { Result } from "../../../helpers/result";

export interface ICreateModuleUseCase {
    execute : (dto : CreateModuleRequestDTO) => Promise<Result<IModuleDocument>>
}