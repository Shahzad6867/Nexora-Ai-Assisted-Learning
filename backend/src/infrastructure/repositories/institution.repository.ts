import {
  BasicInformationDTO,
  BlockOrUnblockDTO,
  InstitutionAddressDTO,
  LegalInformationDTO,
  PrimaryContactDTO,
  VerifyInstitutionDTO,
} from "../../application/dtos/institution.dto";
import { Institution } from "../../domain/entities/institution.entity";
import { Roles } from "../../domain/enums/roles.enum";
import { SortBy } from "../../domain/enums/sortBy.enum";
import { IInstitutionRepository } from "../../domain/repositories/institution.repository";
import InstitutionModel, {
  IInstitutionDocument,
} from "../mongodb/models/institution.model";
import { BaseRepository } from "./base/base.repository";

export class InstitutionRepository extends BaseRepository<IInstitutionDocument> implements IInstitutionRepository {
  async getAll(sortBy : SortBy,skip?: number, itemsPerPage?: number, search?: string) {

    let sortQuery : Record<string, 1 | -1> = {createdAt : -1}
    if(sortBy === SortBy.NEWEST){
      sortQuery = {createdAt : -1}
    }else if(sortBy === SortBy.OLDEST){
      sortQuery = {createdAt : 1}
    }else if(sortBy === SortBy.NAMEASC){
      sortQuery = {institution_name : 1}
    }else if(sortBy === SortBy.NAMEDESC){
      sortQuery = {institution_name : -1}
    }

    if (
      search !== undefined &&
      skip !== undefined &&
      itemsPerPage !== undefined
    ) {
      return await InstitutionModel.find({
        $or: [
          { institution_name: { $regex: search, $options: "i" } },
          { institution_id: { $regex: search, $options: "i" } },
          { institution_email: { $regex: search, $options: "i" } },
        ],
      })
        .sort(sortQuery)
        .skip(skip)
        .limit(itemsPerPage);
    }

    if (skip !== undefined && itemsPerPage !== undefined) {
      return await InstitutionModel.find({}).sort(sortQuery).skip(skip).limit(itemsPerPage);
    }
    return await InstitutionModel.find({}).sort(sortQuery);
  }
  async getById(institution_id: string) {
    return await InstitutionModel.findOne({ institution_id });
  }
  async getByEmail(
    email: string,
    role?: Roles.INSTITUTION
  ): Promise<IInstitutionDocument | null> {
    const query = role
      ? {
          institution_email: email,
          role,
        }
      : {
          institution_email: email,
        };
    return await InstitutionModel.findOne(query);
  }
  async create(institution: Institution): Promise<IInstitutionDocument> {
    const newUser = await InstitutionModel.create({
      institution_id: institution.institution_id,
      institution_name: institution.institution_name,
      institution_email: institution.institution_email,
      password: institution.password,
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
      isBlocked: institution.isBlocked,
      role: institution.role,
    });
    return newUser;
  }
  async update(
    _id: string,
    data:
      | BasicInformationDTO
      | PrimaryContactDTO
      | InstitutionAddressDTO
      | LegalInformationDTO
      | VerifyInstitutionDTO
      | BlockOrUnblockDTO
  ): Promise<IInstitutionDocument | null> {
    const institution = await InstitutionModel.findOneAndUpdate(
      { institution_id: _id },
      data,
      { returnDocument: "after" }
    );
    return institution;
  }
}
