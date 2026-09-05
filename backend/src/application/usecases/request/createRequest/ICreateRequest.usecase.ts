import { Request } from "../../../../domain/entities/request.entity";
import { CreateRequestDTO } from "../../../dtos/request.dto";
import { Result } from "../../../helpers/result";

export interface ICreateRequestUseCase {
    execute : (dto : CreateRequestDTO) => Promise<Result<Request>>
}