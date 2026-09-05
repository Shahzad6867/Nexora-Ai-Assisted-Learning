import { CreateCourseUseCase } from "../../application/usecases/course/createCourse/createCourse.usecase";
import { GetCoursesOfInstituionUseCase } from "../../application/usecases/course/getCoursesOfIntstitution/getCoursesOfInstitution.usecase";
import { EntityIdGenerator } from "../../infrastructure/adapters/EntityIdGenerator.adapter";
import CourseModel from "../../infrastructure/mongodb/models/course.model";
import { CourseRepository } from "../../infrastructure/repositories/course.repository";
import { CourseController } from "../controllers/course.controller";

export class CourseFactory {
    static create() : CourseController {
        const courseRepository = new CourseRepository(CourseModel)
        const entityIdGenerator = new EntityIdGenerator()
        const createCourseUseCase = new CreateCourseUseCase(courseRepository,entityIdGenerator)
        const controller = new CourseController(createCourseUseCase)
        return controller
     }
}