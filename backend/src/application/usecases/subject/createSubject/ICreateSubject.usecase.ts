import { ISubjectDocument } from "../../../../infrastructure/mongodb/models/subject.model";
import { CreateSubjectDTO } from "../../../dtos/subject.dto";
import { Result } from "../../../helpers/result";

export interface ICreateSubjectUseCase {
  execute: (dto: CreateSubjectDTO) => Promise<Result<ISubjectDocument>>;
}
