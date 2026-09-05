
import { Result } from "../../../helpers/result";
import { UpdateRequestDTO } from "../../../dtos/request.dto";

export interface IUpdateRequestStatusUseCase {
    execute : (dto : UpdateRequestDTO) => Promise<Result<string>>
}