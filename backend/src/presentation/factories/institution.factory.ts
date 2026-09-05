import { GetCoursesOfInstituionUseCase } from "../../application/usecases/course/getCoursesOfIntstitution/getCoursesOfInstitution.usecase";
import { GetInstitutionProfileUseCase } from "../../application/usecases/institution/getInstitutionProfile/getInstitutionProfile.usecase";
import { GetInstructorsOfInstitutionUseCase } from "../../application/usecases/institution/getInstructorsOfInstitution/getInstructorsOfInstitution.usecase";
import { UpdateInstitutionProfileUseCase } from "../../application/usecases/institution/updateInstitutionProfileUseCase/updateInstitutionProfile.usecase";
import { CreateInstructorUseCase } from "../../application/usecases/instructor/createInstructor/createInstructor.usecase";
import { EntityIdGenerator } from "../../infrastructure/adapters/EntityIdGenerator.adapter";
import { PasswordAdapter } from "../../infrastructure/adapters/Password.adapter";
import CourseModel from "../../infrastructure/mongodb/models/course.model";
import InstitutionModel from "../../infrastructure/mongodb/models/institution.model";
import InstructorModel from "../../infrastructure/mongodb/models/instructor.model";
import { CourseRepository } from "../../infrastructure/repositories/course.repository";
import { InstitutionRepository } from "../../infrastructure/repositories/institution.repository";
import { InstructorRepository } from "../../infrastructure/repositories/instructor.repository";
import { InstitutionController } from "../controllers/institution.controller";

export class InstitutionFactory {
  static create(): InstitutionController {
    const repository = new InstitutionRepository(InstitutionModel);
    const instructorRepositry = new InstructorRepository(InstructorModel);
    const courseRepository = new CourseRepository(CourseModel)
    const getInstitutionProfileUseCase = new GetInstitutionProfileUseCase(
      repository
    );
    const updateInstitutionProfileUseCase = new UpdateInstitutionProfileUseCase(
      repository
    );
    const entityIdGenerator = new EntityIdGenerator();
    const passwordAdapter = new PasswordAdapter();
    const createInstructorUseCase = new CreateInstructorUseCase(
      instructorRepositry,
      entityIdGenerator,
      passwordAdapter
    );
    const getInstructorsOfInstitutionUseCase =
      new GetInstructorsOfInstitutionUseCase(instructorRepositry);
    const getCoursesOfInstitutionUseCase = new GetCoursesOfInstituionUseCase(courseRepository)
    const controller = new InstitutionController(
      getInstitutionProfileUseCase,
      updateInstitutionProfileUseCase,
      createInstructorUseCase,
      getInstructorsOfInstitutionUseCase,
      getCoursesOfInstitutionUseCase
    );
    return controller;
  }
}
