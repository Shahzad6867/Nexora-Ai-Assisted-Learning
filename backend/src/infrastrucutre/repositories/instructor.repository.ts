import { Instructor } from "../../domain/entities/instructor.entity";
import { IInstructorRepository } from "../../domain/repositories/instructor.repository";
import InstructorModel, { IInstructorDocument } from "../mongodb/models/instructor.model";

export class InstructorRepository implements IInstructorRepository {
    async create(instructor: Instructor) : Promise<IInstructorDocument> {
        const newInstructor = await InstructorModel.create(instructor)
        return newInstructor
    }
    async getAll() : Promise<IInstructorDocument[]>{
        return await InstructorModel.aggregate([
            {
                $lookup : {
                    from : "institutions",
                    foreignField : "institution_id",
                    localField : "institution_id",
                    as : "institution_id"
                }
            },
            {
                $unwind : "$institution_id"
            }
        ])
    }
    async getByEmail(instructor_mail: string) : Promise<IInstructorDocument | null>{
        return await InstructorModel.findOne({instructor_mail : instructor_mail})
    }
    async getByInstitutionId(institution_id: string) : Promise<IInstructorDocument[]>{
        return await InstructorModel.find({institution_id})
    }
    async getById(instructor_id: string) : Promise<IInstructorDocument | null>{
        return await InstructorModel.findOne({instructor_id : instructor_id})
    }
    async update(instructor: Instructor) : Promise<Instructor | null> {
        return await InstructorModel.findOneAndUpdate({instructor_id : instructor.instructor_mail},instructor,{returnDocument : "after"})
    }
}