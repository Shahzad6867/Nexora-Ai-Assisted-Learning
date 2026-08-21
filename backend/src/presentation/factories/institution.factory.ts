import { GetInstitutionProfileUseCase } from "../../application/usecases/institution/getInstitutionProfile.usecaase";
import { GetInstructorsOfInstitutionUseCase } from "../../application/usecases/institution/getInstructorsOfInstitution.usecase";
import { UpdateInstitutionProfileUseCase } from "../../application/usecases/institution/updateInstitutionProfile.usecase";
import { CreateInstructorUseCase } from "../../application/usecases/instructor/createInstructor.usecase";
import { EntityIdGenerator } from "../../infrastrucutre/adapters/EntityIdGenerator.adapter";
import { PasswordAdapter } from "../../infrastrucutre/adapters/Password.adapter";
import { InstitutionRepository } from "../../infrastrucutre/repositories/institution.repository";
import { InstructorRepository } from "../../infrastrucutre/repositories/instructor.repository";
import { InstitutionController } from "../controllers/institution.controller";

export class InstitutionFactory {
  static create(): InstitutionController {
    const repository = new InstitutionRepository();
    const instructorRepositry = new InstructorRepository();
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
    const controller = new InstitutionController(
      getInstitutionProfileUseCase,
      updateInstitutionProfileUseCase,
      createInstructorUseCase,
      getInstructorsOfInstitutionUseCase
    );
    return controller;
  }
}
