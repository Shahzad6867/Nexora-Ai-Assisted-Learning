import { IInstructorDocument } from "../../infrastrucutre/mongodb/models/instructor.model"
import { Instructor } from "../entities/instructor.entity"

export interface IInstructorRepository {
    getById : (instructor_id : string) => Promise<IInstructorDocument | null>
    getByEmail : (instructor_mail : string) => Promise<IInstructorDocument | null>
    getByInstitutionId : (institution_id : string) => Promise<IInstructorDocument[]>
    getAll : () => Promise<IInstructorDocument[]>
    update : (instructor : Instructor) => Promise<Instructor | null>
    create : (instructor : Instructor) => Promise<IInstructorDocument>
}