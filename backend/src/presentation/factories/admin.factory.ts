import { GetInstitutionAndRequestUseCase } from "../../application/usecases/admin/getInstitutionAndRequest.usecase";
import { GetInstitutionsUseCase } from "../../application/usecases/admin/getInstitutions.usecase";
import { GetInstructorsUseCase } from "../../application/usecases/admin/getInstructors.usecase";
import { GetRequestsUseCase } from "../../application/usecases/admin/getRequests.usecase";
import { GetStudentsUseCase } from "../../application/usecases/admin/getStudents.usecase";
import { UpdateRequestStatusUseCase } from "../../application/usecases/admin/updateRequestStatus.usecase";
import { InstitutionRepository } from "../../infrastrucutre/repositories/institution.repository";
import { InstructorRepository } from "../../infrastrucutre/repositories/instructor.repository";
import { RequestRepository } from "../../infrastrucutre/repositories/request.repository";
import { UserRepository } from "../../infrastrucutre/repositories/user.repository";
import { AdminController } from "../controllers/admin.controller";


export class AdminFactory {
  static create(): AdminController {
    const institutionRepository = new InstitutionRepository();
    const userRepository = new UserRepository()
    const requestRepository = new RequestRepository()
    const instructorRepository = new InstructorRepository()
    const getInstitutionsUseCase = new GetInstitutionsUseCase(institutionRepository)
    const getStudentsUseCase = new GetStudentsUseCase(userRepository)
    const getRequestsUseCase = new GetRequestsUseCase(requestRepository)
    const getInstructorsUseCase = new GetInstructorsUseCase(instructorRepository)
    const getInstitutionAndRequestUseCase = new GetInstitutionAndRequestUseCase(institutionRepository,requestRepository)
    const updateRequestStatusUseCase = new UpdateRequestStatusUseCase(requestRepository,institutionRepository)
    const controller = new AdminController(getInstitutionsUseCase,getStudentsUseCase,getRequestsUseCase,getInstructorsUseCase,getInstitutionAndRequestUseCase,updateRequestStatusUseCase);
    return controller;
  }
}
