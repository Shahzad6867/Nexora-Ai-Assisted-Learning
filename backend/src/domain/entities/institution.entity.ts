export class Institution {
  constructor(
    public readonly institution_id: string,
    public institution_name: string | null,
    public institution_email: string,
    public password : string,
    public description: string | null,
    public year_established: Date | null,
    public official_website: string | null,
    public institution_logo: string | null,
    public primary_contact: {
      person_name: string | null;
      designation: string | null;
      official_mail: string | null;
      phone_number: string | null;
      alternate_phone_number: string | null;
    } ,
    public address: {
      country: string | null;
      state: string | null;
      city: string | null;
      postal_code: string | null;
      full_address: string | null;
    } ,
    public legal_information: {
      legal_organization_name: string | null;
      registration_number: string | null;
      registration_authority: string | null;
      tax_identification_number: string | null;
      accreditation_body: string | null;
      legal_document: string | null;
    } ,
    public bank_information: {
      legal_organization_name: string | null;
      bank_name: string | null;
      account_number: string | null;
      swift_code: string | null;
      iban_number: string | null;
    } ,
    public terms_acceptance: boolean,
    public policy_acceptance: boolean,
    public educational_consent: boolean,
    public isVerified: boolean,
    public isBlocked: boolean,
    public role : string
  ) {}
}
