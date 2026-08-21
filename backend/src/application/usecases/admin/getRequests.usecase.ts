import { IRequestRepository } from "../../../domain/repositories/request.repository";

export class GetRequestsUseCase {
    constructor(private readonly requestRepository : IRequestRepository){}
    async execute(){
        return await this.requestRepository.getAll()
    }
}