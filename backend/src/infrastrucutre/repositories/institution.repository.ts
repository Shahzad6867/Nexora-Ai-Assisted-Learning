import { BasicInformationDTO, InstitutionAddressDTO, LegalInformationDTO, PrimaryContactDTO, VerifyInstitutionDTO } from "../../application/dtos/institution.dto";
import { Institution } from "../../domain/entities/institution.entity";
import { IInstitutionRepository } from "../../domain/repositories/institution.repository";
import InstitutionModel,{IInstitutionDocument} from "../mongodb/models/institution.model";

export class InstitutionRepository implements IInstitutionRepository {
  async getAll() {
    return await InstitutionModel.find({});
  }
  async getById(institution_id: string) {
    return await InstitutionModel.findOne({institution_id});
  }
  async getByEmail(email: string) : Promise<IInstitutionDocument | null> {
    return await InstitutionModel.findOne({ institution_email : email });
  }
  async create(institution: Institution): Promise<IInstitutionDocument> {
    const newUser = await InstitutionModel.create({
        institution_id : institution.institution_id,
         institution_name: institution.institution_name,
         institution_email: institution.institution_email,
         password : institution.password,
         description: institution.description,
         year_established: institution.year_established,
         official_website: institution.official_website,
         institution_logo: institution.institution_logo,
         primary_contact: institution.primary_contact,
         address: institution.address,
         legal_information: institution.legal_information,
         bank_information: institution.bank_information,
         terms_acceptance: institution.terms_acceptance,
         policy_acceptance: institution.policy_acceptance,
         educational_consent: institution.educational_consent,
         isVerified: institution.isVerified,
         isBlocked : institution.isBlocked,
         role : institution.role
    });
    return newUser;
  }
  async update(_id : string,data : BasicInformationDTO | PrimaryContactDTO | InstitutionAddressDTO | LegalInformationDTO | VerifyInstitutionDTO) : Promise<IInstitutionDocument | null> {
   const institution = await InstitutionModel.findOneAndUpdate({institution_id : _id},data, { returnDocument: 'after' });
   return institution
  }
}
