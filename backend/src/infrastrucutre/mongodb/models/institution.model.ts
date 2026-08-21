import { model, ObjectId, Schema } from "mongoose";

export interface IInstitutionDocument {
  _id: ObjectId;
  institution_id: string;
  institution_name: string | null;
  institution_email: string;
  password: string;
  description: string | null;
  year_established: Date | null;
  official_website: string | null;
  institution_logo: string | null;
  primary_contact: {
    person_name: string | null;
    designation: string | null;
    official_mail: string | null;
    phone_number: string | null;
    alternate_phone_number: string | null;
  };
  address: {
    country: string | null;
    state: string | null;
    city: string | null;
    postal_code: string | null;
    full_address: string | null;
  };
  legal_information: {
    legal_organization_name: string | null;
    registration_number: string | null;
    registration_authority: string | null;
    tax_identification_number: string | null;
    accreditation_body: string | null;
    legal_document: string | null;
  };
  bank_information: {
    legal_organization_name: string | null;
    bank_name: string | null;
    account_number: string | null;
    swift_code: string | null;
    iban_number: string | null;
  } ;
  terms_acceptance: boolean;
  policy_acceptance: boolean;
  educational_consent: boolean;
  isVerified: boolean;
  isBlocked: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const institutionSchema = new Schema<IInstitutionDocument>(
  {
    institution_id: {
      type: String,
      required: true,
    },
    institution_name: {
      type: String,
      default: null,
    },
    institution_email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    year_established: {
      type: Date,
      default: null,
    },
    official_website: {
      type: String,
      default: null,
    },
    institution_logo: {
      type: String,
      default: null,
    },
    primary_contact: {
      person_name: {
        type: String,
        default: null,
      },
      designation: {
        type: String,
        default: null,
      },
      official_mail: {
        type: String,
        default: null,
      },
      phone_number: {
        type: String,
        default: null,
      },
      alternate_phone_number: {
        type: String,
        default: null,
      },
    },
    address: {
      country: {
        type: String,
        default: null,
      },
      state: {
        type: String,
        default: null,
      },
      city: {
        type: String,
        default: null,
      },
      postal_code: {
        type: String,
        default: null,
      },
      full_address: {
        type: String,
        default: null,
      },
    },
    legal_information: {
      legal_organization_name: {
        type: String,
        default: null,
      },
      registration_number: {
        type: String,
        default: null,
      },
      registration_authority: {
        type: String,
        default: null,
      },
      tax_identification_number: {
        type: String,
        default: null,
      },
      accreditation_body: {
        type: String,
        default: null,
      },
      legal_document: {
        type: String,
        default: null,
      },
    },
    bank_information: {
      legal_organization_name: {
        type: String,
        default: null,
      },
      bank_name: {
        type: String,
        default: null,
      },
      account_number: {
        type: String,
        default: null,
      },
      swift_code: {
        type: String,
        default: null,
      },
      iban_number: {
        type: String,
        default: null,
      },
    },
    terms_acceptance: {
      type: Boolean,
      default: null,
    },
    policy_acceptance: {
      type: Boolean,
      default: null,
    },
    educational_consent: {
      type: Boolean,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: null,
    },
    isBlocked : {
      type: Boolean,
      default: null,
    },
    role : {
        type : String,
        default : null
    }
  },
  {
    timestamps: true,
  }
);

const InstitutionModel = model<IInstitutionDocument>("Institution", institutionSchema);

export default InstitutionModel;
