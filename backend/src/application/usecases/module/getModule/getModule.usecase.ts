import { IGetModuleUseCase } from "./IGetModule.usecase";
import { Result } from "../../../helpers/result";
import { IModuleDocument } from "../../../../infrastructure/mongodb/models/module.model";
import { IModuleRepository } from "../../../../domain/repositories/module.repository";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { MODULE_MESSAGES } from "../module.usecase.messages";
import { ISubjectRepository } from "../../../../domain/repositories/subject.repository";
import { GetModuleResponseDTO } from "../../../dtos/module.dto";

export class GetModuleUseCase implements IGetModuleUseCase {
    constructor(
        private readonly _moduleRepository : IModuleRepository,
        private readonly _subjectRepository : ISubjectRepository
    ){}
    async execute(module_id : string) : Promise<Result<GetModuleResponseDTO>> {
        const module = await this._moduleRepository.getById(module_id)
        if(!module){
            throw new AppError(MODULE_MESSAGES.NOT_FOUND,HTTP_STATUS_CODES.NOT_FOUND)
        }
        const subjects = await this._subjectRepository.getSubjectsByModuleId(module.module_id)
        const result : GetModuleResponseDTO = {
            module_id : module.module_id,
            module_name : module.module_name,
            description : module.description,
            passing_marks : module.passing_marks,
            total_marks : module.total_marks,
            assignment_required : module.assignment_required,
            subjects: subjects
          };
        return Result.success<GetModuleResponseDTO>(result,HTTP_STATUS_CODES.OK)
    }
}