import { UpdateRequestStatusUseCase } from "../../application/usecases/admin/updateRequestStatus.usecase";
import { CreateRequestUseCase } from "../../application/usecases/request/createRequest.usecase";
import { GetRequestUseCase } from "../../application/usecases/request/getRequest.usecase";
import { EntityIdGenerator } from "../../infrastrucutre/adapters/EntityIdGenerator.adapter";
import { InstitutionRepository } from "../../infrastrucutre/repositories/institution.repository";
import { RequestRepository } from "../../infrastrucutre/repositories/request.repository";
import { RequestController } from "../controllers/request.controller";

export class RequestFactory {
  static create(): RequestController {
    const requestRepository = new RequestRepository();
    const institutionRepository = new InstitutionRepository()
    const entityIdGenerator = new EntityIdGenerator();
    const createRequestUseCase =
      new CreateRequestUseCase(
        requestRepository,
        entityIdGenerator
      );
    const getRequestUseCase = new GetRequestUseCase(requestRepository)
    const updateRequestStatusUseCase = new UpdateRequestStatusUseCase(requestRepository,institutionRepository)
    const controller = new RequestController(
      createRequestUseCase,
      getRequestUseCase,
      updateRequestStatusUseCase
    );
    return controller;
  }
}
