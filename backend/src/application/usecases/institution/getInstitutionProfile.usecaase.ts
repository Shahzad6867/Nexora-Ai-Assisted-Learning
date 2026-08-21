import { IInstitutionRepository } from "../../../domain/repositories/institution.repository";
import { GetInstitutionProfileDTO } from "../../dtos/institution.dto";

export class GetInstitutionProfileUseCase {
    constructor(private readonly institutionRepository : IInstitutionRepository){}
    async execute(dto : GetInstitutionProfileDTO) {
        return await this.institutionRepository.getById(dto._id)
    }
}