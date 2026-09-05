import { ICourseDocument } from "../../infrastructure/mongodb/models/course.model";
import { Course } from "../entities/course.entity";
import { SortBy } from "../enums/sortBy.enum";
export interface ICourseRepository {
  getById: (course_id: string) => Promise<ICourseDocument | null>;
  getCoursesByInstitutionId: (institution_id: string) => Promise<ICourseDocument[]>;
  getAll: (
    sortBy: SortBy,
    skip?: number,
    itemsPerPage?: number,
    search?: string
  ) => Promise<ICourseDocument[]>;
  update: (course_id : string,course: Course) => Promise<ICourseDocument | null>;
  create: (course: Course) => Promise<ICourseDocument>;
}
