import { IRequestRepository } from "../../../domain/repositories/request.repository";
import { IRequestDocument } from "../../../infrastrucutre/mongodb/models/request.model";

export class GetRequestUseCase {
    constructor(
        private readonly requestRepository: IRequestRepository
      ) {}
      async execute(_id : string): Promise<IRequestDocument | null> {
          return await this.requestRepository.getById(_id)
      }
}