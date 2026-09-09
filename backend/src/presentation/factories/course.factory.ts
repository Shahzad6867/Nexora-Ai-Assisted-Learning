import { CreateCourseUseCase } from "../../application/usecases/course/createCourse/createCourse.usecase";
import { GetCourseUseCase } from "../../application/usecases/course/getCourse/getCourse.usecase";
import { GetCoursesOfInstituionUseCase } from "../../application/usecases/course/getCoursesOfIntstitution/getCoursesOfInstitution.usecase";
import { UpdateCourseUseCase } from "../../application/usecases/course/updateCourse/updateCourse.usecase";
import { GetModulesByCourseIdUseCase } from "../../application/usecases/module/getModulesByCourseId/getModulesByCourseId.usecase";
import { EntityIdGenerator } from "../../infrastructure/adapters/EntityIdGenerator.adapter";
import CourseModel from "../../infrastructure/mongodb/models/course.model";
import ModuleModel from "../../infrastructure/mongodb/models/module.model";
import SubjectModel from "../../infrastructure/mongodb/models/subject.model";
import { CourseRepository } from "../../infrastructure/repositories/course.repository";
import { ModuleRepository } from "../../infrastructure/repositories/module.repository";
import { SubjectRepository } from "../../infrastructure/repositories/subject.repository";
import { CourseController } from "../controllers/course.controller";

export class CourseFactory {
    static create() : CourseController {
        const courseRepository = new CourseRepository(CourseModel)
        const moduleRepository = new ModuleRepository(ModuleModel)
        const subjectRepository = new SubjectRepository(SubjectModel)
        const entityIdGenerator = new EntityIdGenerator()
        const createCourseUseCase = new CreateCourseUseCase(courseRepository,entityIdGenerator)
        const getCourseUseCase = new GetCourseUseCase(courseRepository,moduleRepository,subjectRepository)
        const updateCourseUseCase = new UpdateCourseUseCase(courseRepository)
        const controller = new CourseController(createCourseUseCase,getCourseUseCase,updateCourseUseCase)
        return controller
     }
}