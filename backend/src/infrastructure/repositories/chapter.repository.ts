import { Chapter } from "../../domain/entities/chapter.entity"
import { IChapterRepository } from "../../domain/repositories/chapter.repository"
import ChapterModel, { IChapterDocument } from "../mongodb/models/chapter.model"
import { BaseRepository } from "./base/base.repository"


export class ChapterRepository extends BaseRepository<IChapterDocument> implements IChapterRepository {
    async create(chapter : Chapter) : Promise<IChapterDocument> {
        return await ChapterModel.create(chapter)
    } 
    async getById(chapter_id: string): Promise<IChapterDocument | null> {
        const result = await ChapterModel.aggregate([{
            $match : {
                chapter_id : chapter_id
            }
        },{
            $lookup : {
                from : "subjects",
                foreignField : "subject_id",
                localField : "subject_id",
                as : "subject_id"
            }
        },{
            $unwind : "$subject_id"
        },{
            $lookup : {
                from : "instructors",
                foreignField : "instructor_id",
                localField : "subject_id.instructor_id",
                as : "instructor"
            }
        },{
            $unwind : "$instructor"
        }])
        return result[0] as IChapterDocument
    }
    async getAllBySubjectId(subject_id : string) : Promise<IChapterDocument[]> {
        return await ChapterModel.find({subject_id})
    }
    async delete(chapter_id : string) : Promise<boolean | null> {
        return await ChapterModel.findOneAndDelete({chapter_id})
    }

    async update(chapter_id : string,chapter : Chapter) :  Promise<IChapterDocument | null> {
        return await ChapterModel.findOneAndUpdate({chapter_id},chapter,{returnDocument : "after"})
    }
}