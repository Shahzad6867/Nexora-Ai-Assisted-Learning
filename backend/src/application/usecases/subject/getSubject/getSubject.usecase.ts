import { IChapterRepository } from "../../../../domain/repositories/chapter.repository";
import { ISubjectRepository } from "../../../../domain/repositories/subject.repository";
import { ISubjectDocument } from "../../../../infrastructure/mongodb/models/subject.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { GetSubjectResponseDTO } from "../../../dtos/subject.dto";
import { Result } from "../../../helpers/result";
import { SUBJECT_MESSAGES } from "../subject.usecase.messages";
import { IGetSubjectUseCase } from "./IGetSubject.usecase";

export class GetSubjectUseCase implements IGetSubjectUseCase {
    constructor(
        private readonly _subjectRepository : ISubjectRepository,
        private readonly _chapterRepository : IChapterRepository,
    ){}
    async execute(subject_id : string) : Promise<Result<GetSubjectResponseDTO>> {
        const subject = await this._subjectRepository.getById(subject_id)
        if(!subject){
            throw new AppError(SUBJECT_MESSAGES.NOT_FOUND,HTTP_STATUS_CODES.NOT_FOUND)
        }
        const chapters = await this._chapterRepository.getAllBySubjectId(subject_id)
        const result = {
            module_id: subject.module_id,
            subject_id: subject.subject_id,
            subject_name: subject.subject_name,
            description: subject.description,
            instructor_id: subject.instructor_id,
            chapters 
        }
        return Result.success(result,HTTP_STATUS_CODES.OK)   
    }
}