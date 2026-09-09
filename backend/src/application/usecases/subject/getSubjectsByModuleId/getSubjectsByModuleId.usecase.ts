import { ISubjectRepository } from "../../../../domain/repositories/subject.repository";
import { ISubjectDocument } from "../../../../infrastructure/mongodb/models/subject.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { Result } from "../../../helpers/result";
import { IGetSubjectsByModuleId } from "./IGetSubjectsByModuleId.usecase";

export class GetSubjectsByModuleId implements IGetSubjectsByModuleId {
    constructor(
        private readonly _subjectRepository : ISubjectRepository
    ){}
    async execute(module_id : string) : Promise<Result<ISubjectDocument[]>> {
        const subjects = await this._subjectRepository.getSubjectsByModuleId(module_id)
        return Result.success(subjects,HTTP_STATUS_CODES.OK)   
    }
}