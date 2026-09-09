import { Module } from "../../../../domain/entities/module.entity";
import { IdPrefix } from "../../../../domain/enums/idPrefix.enum";
import { IModuleRepository } from "../../../../domain/repositories/module.repository";
import { IModuleDocument } from "../../../../infrastructure/mongodb/models/module.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { CreateModuleRequestDTO } from "../../../dtos/module.dto";
import { Result } from "../../../helpers/result";
import { IEntityIdGenerator } from "../../../interfaces/IEntityIdGenerator.interface";
import { ICreateModuleUseCase } from "./ICreateModule.usecase";

export class CreateModuleUseCase implements ICreateModuleUseCase {
    constructor(
        private readonly _moduleRepository : IModuleRepository,
        private readonly _entityIdGenerator : IEntityIdGenerator
    ){}
    async execute(dto : CreateModuleRequestDTO) : Promise<Result<IModuleDocument>>{
        const moduleId = this._entityIdGenerator.generate(IdPrefix.MODULE)
        const module = new Module(
            moduleId,
            dto.course_id,
            dto.module_name,
            dto.description,
            dto.passing_marks,
            dto.total_marks,
            dto.assignment_required
        )
        const newModule = await this._moduleRepository.create(module)
        return Result.success(newModule,HTTP_STATUS_CODES.CREATED)
    }
}