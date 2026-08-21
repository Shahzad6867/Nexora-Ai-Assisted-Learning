import { IInstitutionRepository } from "../../../domain/repositories/institution.repository";

export class GetInstitutionsUseCase {
    constructor(private readonly institutionRepository : IInstitutionRepository){}
    async execute(){
        return await this.institutionRepository.getAll()
    }
}