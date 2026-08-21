export interface RegisterInstitutionDTO {
    email : string
    password : string
    role : string
}

export interface GetInstitutionProfileDTO {
    _id : string
}

export interface PrimaryContactDTO {
    primary_contact : {
        person_name: string;
        designation: string;
        official_mail: string;
        phone_number: string;
        alternate_phone_number: string;
    }
  }
  
  export interface InstitutionAddressDTO {
    address : {
        country: string;
        state: string;
        city: string;
        postal_code: string;
        full_address: string;
    }
  }
  
  export interface LegalInformationDTO {
    legal_information : {
        legal_organization_name: string;
        registration_number: string;
        registration_authority: string;
        tax_identification_number: string;
        accreditation_body: string;
        legal_document: string;
    }
  }
  
  export interface BankInformationDTO {
    bank_information : {
        legal_organization_name: string;
        bank_name: string;
        account_number: string;
        swift_code: string;
        iban_number: string;
    }
  }

  export interface BasicInformationDTO{
    institution_name : string
    year_established : Date
    official_website ?: string
    description : string
    institution_logo ?: string 
  }

  export interface VerifyInstitutionDTO {
    isVerified : boolean
  }