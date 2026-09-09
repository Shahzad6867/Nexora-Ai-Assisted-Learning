import { ISubjectDocument } from "../../infrastructure/mongodb/models/subject.model";
import { Subject } from "../entities/subject.entity";

export interface ISubjectRepository {
    getById: (subject_id: string) => Promise<ISubjectDocument | null>;
  getSubjectsByModuleId: (module_id: string) => Promise<ISubjectDocument[]>;
  getSubjectsByInstructorId: (instructor_id: string) => Promise<ISubjectDocument[]>;
  update: (subject_id : string,subject: Subject) => Promise<ISubjectDocument | null>;
  create: (subject: Subject) => Promise<ISubjectDocument>;
}