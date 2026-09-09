import { Subject } from "../../../../domain/entities/subject.entity";
import { IdPrefix } from "../../../../domain/enums/idPrefix.enum";
import { ISubjectRepository } from "../../../../domain/repositories/subject.repository";
import { ISubjectDocument } from "../../../../infrastructure/mongodb/models/subject.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { CreateSubjectDTO } from "../../../dtos/subject.dto";

import { Result } from "../../../helpers/result";
import { IEntityIdGenerator } from "../../../interfaces/IEntityIdGenerator.interface";
import { ICreateSubjectUseCase } from "./ICreateSubject.usecase";

export class CreateSubjectUseCase implements ICreateSubjectUseCase {
  constructor(
    private readonly _subjectRepository: ISubjectRepository,
    private readonly _entityIdGenerator: IEntityIdGenerator
  ) {}
  async execute(dto: CreateSubjectDTO): Promise<Result<ISubjectDocument>> {
    const subjectId = this._entityIdGenerator.generate(IdPrefix.SUBJECT);
    const subject = new Subject(
      dto.module_id,
      subjectId,
      dto.subject_name,
      dto.description,
      null,
      null,
      dto.instructor_id
    );

    const newSubject = await this._subjectRepository.create(subject);
    return Result.success(newSubject, HTTP_STATUS_CODES.CREATED);
  }
}
