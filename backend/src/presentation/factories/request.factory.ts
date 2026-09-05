import { UpdateRequestStatusUseCase } from "../../application/usecases/admin/updateRequestStatus/updateRequestStatus.usecase";
import { CreateRequestUseCase } from "../../application/usecases/request/createRequest/createRequest.usecase";
import { GetRequestUseCase } from "../../application/usecases/request/getRequest/getRequest.usecase";
import { EntityIdGenerator } from "../../infrastructure/adapters/EntityIdGenerator.adapter";
import InstitutionModel from "../../infrastructure/mongodb/models/institution.model";

import RequestModel from "../../infrastructure/mongodb/models/request.model";
import { InstitutionRepository } from "../../infrastructure/repositories/institution.repository";
import { RequestRepository } from "../../infrastructure/repositories/request.repository";
import { RequestController } from "../controllers/request.controller";

export class RequestFactory {
  static create(): RequestController {
    const requestRepository = new RequestRepository(RequestModel);
    const institutionRepository = new InstitutionRepository(InstitutionModel);
    const entityIdGenerator = new EntityIdGenerator();
    const createRequestUseCase = new CreateRequestUseCase(
      requestRepository,
      entityIdGenerator
    );
    const getRequestUseCase = new GetRequestUseCase(requestRepository);
    const updateRequestStatusUseCase = new UpdateRequestStatusUseCase(
      requestRepository,
      institutionRepository
    );
    const controller = new RequestController(
      createRequestUseCase,
      getRequestUseCase,
      updateRequestStatusUseCase
    );
    return controller;
  }
}
