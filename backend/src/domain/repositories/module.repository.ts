
import { ObjectId } from "mongoose";
import { IModuleDocument } from "../../infrastructure/mongodb/models/module.model";
import { Module } from "../entities/module.entity";
export interface IModuleRepository {
  getById: (module_id: string) => Promise<IModuleDocument | null>;
  getModulesByCourseId: (course_id: string) => Promise<IModuleDocument[]>;
  update: (module_id : string,module: Module) => Promise<IModuleDocument | null>;
  create: (module: Module) => Promise<IModuleDocument>;
  delete : (module_id : string) => Promise<boolean | null>
}
