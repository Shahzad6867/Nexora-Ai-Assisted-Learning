import { IInstitutionRepository } from "../../../domain/repositories/institution.repository";
import { IInstructorRepository } from "../../../domain/repositories/instructor.repository";
import { GetInstitutionProfileDTO } from "../../dtos/institution.dto";

export class GetInstructorsOfInstitutionUseCase {
    constructor(private readonly institutionRepository : IInstructorRepository){}
    async execute(_id : string) {
        return await this.institutionRepository.getByInstitutionId(_id)
    }
}