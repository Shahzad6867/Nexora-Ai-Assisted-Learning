import { UpdateIsBlockedEntityUseCase } from "../../application/usecases/admin/updateIsBlockedEntity/updateIsBlockedEntity.usecase";
import { GetInstitutionAndRequestUseCase } from "../../application/usecases/admin/getInstitutionAndRequest/getInstitutionAndRequest.usecase";
import { GetInstitutionsUseCase } from "../../application/usecases/admin/getInstitutions/getInstitutions.usecase";
import { GetInstructorsUseCase } from "../../application/usecases/admin/getInstructors/getInstructors.usecase";
import { GetRequestsUseCase } from "../../application/usecases/admin/getRequests/getRequests.usecase";
import { GetStudentsUseCase } from "../../application/usecases/admin/getStudents/getStudents.usecase";
import { UpdateRequestStatusUseCase } from "../../application/usecases/admin/updateRequestStatus/updateRequestStatus.usecase";
import { InstitutionRepository } from "../../infrastructure/repositories/institution.repository";
import { InstructorRepository } from "../../infrastructure/repositories/instructor.repository";
import { RequestRepository } from "../../infrastructure/repositories/request.repository";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { AdminController } from "../controllers/admin.controller";
import UserModel from "../../infrastructure/mongodb/models/user.model";
import RequestModel from "../../infrastructure/mongodb/models/request.model";
import InstructorModel from "../../infrastructure/mongodb/models/instructor.model";
import InstitutionModel from "../../infrastructure/mongodb/models/institution.model";

export class AdminFactory {
  static create(): AdminController {
    const institutionRepository = new InstitutionRepository(InstitutionModel);
    const userRepository = new UserRepository(UserModel);
    const requestRepository = new RequestRepository(RequestModel);
    const instructorRepository = new InstructorRepository(InstructorModel);
    const getInstitutionsUseCase = new GetInstitutionsUseCase(
      institutionRepository
    );
    const getStudentsUseCase = new GetStudentsUseCase(userRepository);
    const getRequestsUseCase = new GetRequestsUseCase(requestRepository);
    const getInstructorsUseCase = new GetInstructorsUseCase(
      instructorRepository
    );
    const getInstitutionAndRequestUseCase = new GetInstitutionAndRequestUseCase(
      institutionRepository,
      requestRepository
    );
    const updateRequestStatusUseCase = new UpdateRequestStatusUseCase(
      requestRepository,
      institutionRepository
    );
    const blockStudentUseCase = new UpdateIsBlockedEntityUseCase(
      userRepository,
      institutionRepository,
      instructorRepository
    );
    const controller = new AdminController(
      getInstitutionsUseCase,
      getStudentsUseCase,
      getRequestsUseCase,
      getInstructorsUseCase,
      getInstitutionAndRequestUseCase,
      updateRequestStatusUseCase,
      blockStudentUseCase
    );
    return controller;
  }
}
