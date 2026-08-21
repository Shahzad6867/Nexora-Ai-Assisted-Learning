import { BasicInformationDTO, InstitutionAddressDTO, LegalInformationDTO, PrimaryContactDTO, VerifyInstitutionDTO } from "../../application/dtos/institution.dto"
import { IInstitutionDocument } from "../../infrastrucutre/mongodb/models/institution.model"
import { Institution } from "../entities/institution.entity"


export interface IInstitutionRepository {
    getById : (institution_id : string) => Promise<IInstitutionDocument | null>
    getByEmail : (email : string) => Promise<IInstitutionDocument | null>
    getAll : () => Promise<IInstitutionDocument[]>
    update : (_id : string,data : BasicInformationDTO | PrimaryContactDTO | InstitutionAddressDTO | LegalInformationDTO | VerifyInstitutionDTO ) => Promise<IInstitutionDocument | null>
    create : (institution : Institution) => Promise<IInstitutionDocument>
}