import { Module } from "../../domain/entities/module.entity";
import { IModuleRepository } from "../../domain/repositories/module.repository";
import ModuleModel, { IModuleDocument } from "../mongodb/models/module.model";
import { BaseRepository } from "./base/base.repository";

export class ModuleRepository extends BaseRepository<IModuleDocument> implements IModuleRepository {
    async getById(_id: string): Promise<IModuleDocument | null> {
        const result = await ModuleModel.aggregate([
            { $match: { module_id: _id } },
            { $lookup: { from: "courses", foreignField: "course_id", localField: "course_id", as: "course_id" } },
            { $unwind: "$course_id" },
          ]);
        return result[0] as IModuleDocument
    }
    async getModulesByCourseId(course_id: string) : Promise<IModuleDocument[]> {
        const modules = await ModuleModel.find({course_id})
        return modules
    }
    async create(module : Module) : Promise<IModuleDocument> {
        const newModule = await ModuleModel.create(module)
        return newModule
    }

    async update(module_id : string,module : Module): Promise<IModuleDocument | null>{
        return await ModuleModel.findOneAndUpdate({module_id},module,{returnDocument : "after"})
    }

    async delete(module_id : string): Promise<boolean | null>{
        return await ModuleModel.findOneAndDelete({module_id})
    }
}