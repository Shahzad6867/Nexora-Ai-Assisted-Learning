import { Result } from "../../../helpers/result";

export interface IDeleteModuleUseCase {
    execute : (module_id : string) => Promise<Result<boolean>>
}