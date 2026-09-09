import { Subject } from "../../../../domain/entities/subject.entity";
import { ISubjectRepository } from "../../../../domain/repositories/subject.repository";
import { ISubjectDocument } from "../../../../infrastructure/mongodb/models/subject.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { UpdateSubjectRequestDTO } from "../../../dtos/subject.dto";
import { Result } from "../../../helpers/result";
import { SUBJECT_MESSAGES } from "../subject.usecase.messages";
import { IUpdateSubjectUseCase } from "./IUpdateSubject.usecase";


export class UpdateSubjectUseCase implements IUpdateSubjectUseCase {
    constructor(
        private readonly _subjectRepository : ISubjectRepository
    ){}
    async execute(subject_id : string,dto : UpdateSubjectRequestDTO) : Promise<Result<ISubjectDocument | null>> {
        const subjectToBeUpdated = await this._subjectRepository.getById(subject_id)
        if(!subjectToBeUpdated){
            throw new AppError(SUBJECT_MESSAGES.NOT_FOUND,HTTP_STATUS_CODES.NOT_FOUND)
        }
        const subject = new Subject(
            subjectToBeUpdated.module_id,
            subjectToBeUpdated.subject_id,
            dto.subject_name,
            dto.description,
            subjectToBeUpdated?.assignment_name,
            subjectToBeUpdated?.assignment_guidline,
            dto.instructor_id
        )
        const updatedSubject = await this._subjectRepository.update(subject_id,subject)

        return Result.success(updatedSubject,HTTP_STATUS_CODES.OK)   
    }
}