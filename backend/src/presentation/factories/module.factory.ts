import { CreateModuleUseCase } from "../../application/usecases/module/createModule/createModule.usecase"
import { DeleteModuleUseCase } from "../../application/usecases/module/deleteModule/deleteModule.usecase"
import { GetModuleUseCase } from "../../application/usecases/module/getModule/getModule.usecase"
import { UpdateModuleUseCase } from "../../application/usecases/module/updateModule/updateModule.usecase"
import { EntityIdGenerator } from "../../infrastructure/adapters/EntityIdGenerator.adapter"
import ModuleModel from "../../infrastructure/mongodb/models/module.model"
import SubjectModel from "../../infrastructure/mongodb/models/subject.model"
import { ModuleRepository } from "../../infrastructure/repositories/module.repository"
import { SubjectRepository } from "../../infrastructure/repositories/subject.repository"
import { ModuleController } from "../controllers/module.controller"


export class ModuleFactory {
    static create() : ModuleController {
        const moduleRepository = new ModuleRepository(ModuleModel)
        const subjectRepository = new SubjectRepository(SubjectModel)
        const entityIdGenerator = new EntityIdGenerator()
        const createModuleUseCase = new CreateModuleUseCase(moduleRepository,entityIdGenerator)
        const updateModuleUseCase = new UpdateModuleUseCase(moduleRepository)
        const deleteModuleUseCase = new DeleteModuleUseCase(moduleRepository)
        const getModuleUseCase = new GetModuleUseCase(moduleRepository,subjectRepository)
        const controller = new ModuleController(createModuleUseCase,updateModuleUseCase,deleteModuleUseCase,getModuleUseCase)
        return controller
     }
}