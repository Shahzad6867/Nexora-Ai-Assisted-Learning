import { IModuleRepository } from "../../../../domain/repositories/module.repository";
import { IModuleDocument } from "../../../../infrastructure/mongodb/models/module.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { Result } from "../../../helpers/result";
import { IGetModulesByCourseIdUseCase } from "./IGetModulesByCourseId.usecase";

export class GetModulesByCourseIdUseCase implements IGetModulesByCourseIdUseCase {
    constructor(
        private readonly _moduleRepository : IModuleRepository
    ){}
    async execute(course_id : string) : Promise<Result<IModuleDocument[]>> {
        const modules = await this._moduleRepository.getModulesByCourseId(course_id)
        return Result.success(modules,HTTP_STATUS_CODES.OK)
    }
}