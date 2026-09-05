import { IInstructorDocument } from "../../../../infrastructure/mongodb/models/instructor.model";
import { Result } from "../../../helpers/result";

export interface IGetInstructorsOfInstitutionUseCase {
  execute: (_id: string) => Promise<Result<IInstructorDocument[]>>;
}
