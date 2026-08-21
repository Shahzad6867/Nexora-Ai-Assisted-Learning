import { Request } from "../../../domain/entities/request.entity";
import { IInstitutionRepository } from "../../../domain/repositories/institution.repository";
import { IRequestRepository } from "../../../domain/repositories/request.repository";
import { UpdateRequestDTO } from "../../dtos/request.dto";

export class UpdateRequestStatusUseCase {
    constructor(
        private readonly requestRepository : IRequestRepository,
        private readonly insititutionRepository : IInstitutionRepository
    ){}
    async execute(dto : UpdateRequestDTO)
    {
        const request = await this.requestRepository.getById(dto.request_id)
        if(request === null){
            throw new Error("Request not found")
        }

        const status_obj = {
            status : dto.status_type,
            timestamp : new Date(),
            note : dto.status_note
        }
        request.status_timeline.push(status_obj)

        const updatedRequest = new Request(
            request.request_id,
            request.request_type,
            request.submitted_by,
            request.submitted_on,
            dto.status_type === "Approved" ? true : false,
            request.status_timeline
        )

       await this.requestRepository.update(updatedRequest)
       dto.status_type === "Approved" && await this.insititutionRepository.update(request.submitted_by,{isVerified : true})

       return request.submitted_by
    }
}