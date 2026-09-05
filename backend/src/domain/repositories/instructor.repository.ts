import { IInstructorDocument } from "../../infrastructure/mongodb/models/instructor.model";
import { Instructor } from "../entities/instructor.entity";
import { SortBy } from "../enums/sortBy.enum";

export interface IInstructorRepository {
  getById: (instructor_id: string) => Promise<IInstructorDocument | null>;
  getByEmail: (instructor_mail: string) => Promise<IInstructorDocument | null>;
  getByInstitutionId: (
    institution_id: string
  ) => Promise<IInstructorDocument[]>;
  getAll: (
    sortBy: SortBy,
    skip?: number,
    itemsPerPage?: number,
    search?: string
  ) => Promise<IInstructorDocument[]>;
  update: (instructor_id : string,instructor: Instructor) => Promise<IInstructorDocument | null>;
  create: (instructor: Instructor) => Promise<IInstructorDocument>;
}
