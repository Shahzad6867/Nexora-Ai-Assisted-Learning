
import { Subject } from "../../domain/entities/subject.entity";
import { ISubjectRepository } from "../../domain/repositories/subject.repository";
import SubjectModel, { ISubjectDocument } from "../mongodb/models/subject.model";
import { BaseRepository } from "./base/base.repository";

export class SubjectRepository extends BaseRepository<ISubjectDocument> implements ISubjectRepository {
    async create(subject : Subject ) : Promise<ISubjectDocument> {
        return await SubjectModel.create(subject)
    } 
    async getSubjectsByModuleId(module_id : string) : Promise<ISubjectDocument[]> {
        return await SubjectModel.find({module_id})
    }
    async update(subject_id : string,subject : Subject) : Promise<ISubjectDocument | null> {
        return await SubjectModel.findOneAndUpdate({subject_id},subject,{returnDocument : "after"})
    }
    async getById(subject_id: string): Promise<ISubjectDocument | null> {
        return await SubjectModel.findOne({subject_id})
    }
    async getSubjectsByInstructorId(instructor_id : string) : Promise<ISubjectDocument[]> {
        return await SubjectModel.aggregate([{
            $match : {
                instructor_id
            }
        },{
            $lookup : {
                from : "modules",
                foreignField : "module_id",
                localField : "module_id",
                as : "module_id"
            }
        },{
            $unwind : "$module_id"
        },
        {
            $lookup : {
                from : "courses",
                foreignField : "course_id",
                localField : "module_id.course_id",
                as : "course"
            }
        },{
            $unwind : "$course"
        },])
    }

}