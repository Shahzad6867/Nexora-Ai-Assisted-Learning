import { GetModuleResponseDTO } from "../../../dtos/module.dto";
import { Result } from "../../../helpers/result";

export interface IGetModuleUseCase {
    execute : (module_id : string) => Promise<Result<GetModuleResponseDTO>> 
}