import { ISubjectRepository } from "../../../../domain/repositories/subject.repository";
import { ISubjectDocument } from "../../../../infrastructure/mongodb/models/subject.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { Result } from "../../../helpers/result";
import { IGetSubjectsByInstructorIdUseCase } from "./IGetSubjectsByInstructorId.usecase";

export class GetSubjectsByInstructorIdUseCase implements IGetSubjectsByInstructorIdUseCase {
    constructor(
        private readonly _subjectRepository : ISubjectRepository
    ){}
    async execute(instructor_id : string) : Promise<Result<ISubjectDocument[]>> {
        const subjects = await this._subjectRepository.getSubjectsByInstructorId(instructor_id)
        return Result.success(subjects,HTTP_STATUS_CODES.OK)   
    }
}