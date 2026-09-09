import { IModuleRepository } from "../../../../domain/repositories/module.repository";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { Result } from "../../../helpers/result";
import { MODULE_MESSAGES } from "../module.usecase.messages";
import { IDeleteModuleUseCase } from "./IDeleteModule.usecase";

export class DeleteModuleUseCase implements IDeleteModuleUseCase {
    constructor(
        private readonly _moduleRepository : IModuleRepository
    ){}
    async execute(module_id : string) : Promise<Result<boolean>> {
        const isDeleted = await this._moduleRepository.delete(module_id)
        if(!isDeleted){
            throw new AppError(MODULE_MESSAGES.NOT_FOUND,HTTP_STATUS_CODES.NOT_FOUND)
        }
        return Result.success(true,HTTP_STATUS_CODES.OK)
    }
}