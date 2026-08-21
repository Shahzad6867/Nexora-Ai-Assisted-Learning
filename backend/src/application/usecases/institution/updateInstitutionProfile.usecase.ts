import { Institution } from "../../../domain/entities/institution.entity";
import { IInstitutionRepository } from "../../../domain/repositories/institution.repository";
import { BasicInformationDTO, InstitutionAddressDTO, LegalInformationDTO, PrimaryContactDTO } from "../../dtos/institution.dto";


export class UpdateInstitutionProfileUseCase {
    constructor(private readonly institutionRepository : IInstitutionRepository){}
    async execute(_id : string,dto : BasicInformationDTO | PrimaryContactDTO | InstitutionAddressDTO | LegalInformationDTO ) {
       return await this.institutionRepository.update(_id,dto)
    }
}