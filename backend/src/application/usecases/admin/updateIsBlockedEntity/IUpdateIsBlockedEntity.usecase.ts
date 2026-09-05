import { Instructor } from "../../../../domain/entities/instructor.entity";
import { User } from "../../../../domain/entities/user.entity";
import { IInstitutionDocument } from "../../../../infrastructure/mongodb/models/institution.model";
import { UpdateIsBlockedDTO } from "../../../dtos/admin.dto";
import { Result } from "../../../helpers/result";

export interface IUpdateIsBlockedEntitytUseCase {
  execute: (
    dto: UpdateIsBlockedDTO
  ) => Promise<Result<User | IInstitutionDocument | Instructor | null>>;
}
