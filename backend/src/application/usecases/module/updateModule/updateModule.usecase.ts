import { Module } from "../../../../domain/entities/module.entity";
import { IModuleRepository } from "../../../../domain/repositories/module.repository";
import { IModuleDocument } from "../../../../infrastructure/mongodb/models/module.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { CreateModuleRequestDTO } from "../../../dtos/module.dto";
import { Result } from "../../../helpers/result";
import { MODULE_MESSAGES } from "../module.usecase.messages";
import { IUpdateModuleUseCase } from "./IUpdateModule.usecase";

export class UpdateModuleUseCase implements IUpdateModuleUseCase {
    constructor(
        private readonly _moduleRepository : IModuleRepository
    ){}
    async execute(module_id : string,dto : CreateModuleRequestDTO) : Promise<Result<IModuleDocument | null>> {
        const moduleToBeUpdated = await this._moduleRepository.getById(module_id)
        if(!moduleToBeUpdated){
            throw new AppError(MODULE_MESSAGES.NOT_FOUND,HTTP_STATUS_CODES.NOT_FOUND)
        }
        const module = new Module(
            moduleToBeUpdated.module_id,
            moduleToBeUpdated.course_id,
            dto.module_name,
            dto.description,
            dto.passing_marks,
            dto.total_marks,
            dto.assignment_required
        )
        const updatedModule = await this._moduleRepository.update(module_id,module)
        return Result.success(updatedModule,HTTP_STATUS_CODES.OK)
    }
}