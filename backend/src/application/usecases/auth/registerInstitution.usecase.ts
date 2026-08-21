import { Institution } from "../../../domain/entities/institution.entity";
import { IInstitutionRepository } from "../../../domain/repositories/institution.repository";
import { RegisterInstitutionDTO } from "../../dtos/institution.dto";
import { IEntityIdGenerator } from "../../interfaces/IEntityIdGenerator.interface";

export class RegisterInstitutionUseCase {
  constructor(
    private readonly institutionRepository: IInstitutionRepository,
    private readonly entityIdGenerator: IEntityIdGenerator
  ) {}
  async execute(dto: RegisterInstitutionDTO): Promise<string> {
    let institutionId = "";
    let idExists = true;
    while (idExists) {
      const id = this.entityIdGenerator.generate("INST");
      const institutionExist = await this.institutionRepository.getById(id);
      if (institutionExist === null) {
        institutionId = id;
        idExists = false;
      }
    }

    const institution = new Institution(
      institutionId,
      null,
      dto.email,
      dto.password,
      null,
      null,
      null,
      null,
      {
        person_name: null,
        designation: null,
        official_mail: null,
        phone_number: null,
        alternate_phone_number: null,
      },
      {
        country: null,
        state: null,
        city: null,
        postal_code: null,
        full_address: null,
      },
      {
        legal_organization_name: null,
        registration_number: null,
        registration_authority: null,
        tax_identification_number: null,
        accreditation_body: null,
        legal_document: null,
      },
      {
        legal_organization_name: null,
        bank_name: null,
        account_number: null,
        swift_code: null,
        iban_number: null,
      },
      false,
      false,
      false,
      false,
      false,
      dto.role
    );
    await this.institutionRepository.create(institution);
    return institutionId;
  }
}
