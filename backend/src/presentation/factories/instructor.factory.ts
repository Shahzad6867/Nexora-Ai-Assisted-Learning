import { GetInstructorUseCase } from "../../application/usecases/instructor/getInstructor/getInstructor.usecase";
import InstructorModel from "../../infrastructure/mongodb/models/instructor.model";
import { InstructorRepository } from "../../infrastructure/repositories/instructor.repository";
import { InstructorController } from "../controllers/instructor.controller";

export class InstructorFactory {
  static create(): InstructorController {
    const repository = new InstructorRepository(InstructorModel);
    const getInstructorUseCase = new GetInstructorUseCase(repository)
    const controller = new InstructorController(getInstructorUseCase)
    return controller;
  }
}
