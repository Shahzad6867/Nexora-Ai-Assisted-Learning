export type StatusKind = "active" | "pending" | "suspended" | "blocked" | "Pending Approval";

export interface Institution {
  id: string;
  initials: string;
  name: string;
  email: string;
  description: string;
  courses: number;
  students: number;
  instructors: number;
  status: StatusKind;
  established: string;
  website: string;
  country: string;
  city: string;
  postalCode: string;
  legalOrg: string;
  regNumber: string;
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  age: number;
  institution: string;
  enrolledCourses: number;
  status: StatusKind;
  accountCreated: string;
}


export type RequestVariant = "primary" | "danger" | "warning";

export interface PlatformRequest {
  request_id: string;
  request_type: string;
  submitted_by: {
    institution_name : string
    institution_id : string
  };
  submitted_on: string;
  status_timeline : [{
    status : string,
    timestamp : Date,
    note ?: string
  }]
}


/* =========================================================
   LIST-VIEW SUMMARY TYPE
   What the Institutions grid page uses — a lighter shape a
   list/search endpoint would realistically return.
========================================================= */


export interface InstitutionSummary {
  id: string;
  initials: string;
  name: string;
  email: string;
  description: string;
  courses: number;
  students: number;
  instructors: number;
  status: StatusKind;
}

/* =========================================================
   FULL INSTITUTION RECORD — matches your ERD
   This is what the detail page fetches by id.
========================================================= */

export interface PrimaryContact {
  person_name: string;
  designation: string;
  official_mail: string;
  phone_number: string;
  alternate_phone_number: string;
}

export interface InstitutionAddress {
  country: string;
  state: string;
  city: string;
  postal_code: string;
  full_address: string;
}

export interface LegalInformation {
  legal_organization_name: string;
  registration_number: string;
  registration_authority: string;
  tax_identification_number: string;
  accreditation_body: string;
  legal_document: string;
}

export interface BankInformation {
  legal_organization_name: string;
  bank_name: string;
  account_number: string;
  swift_code: string;
  iban_number: string;
}

export interface InstitutionRecord {
  _id: string;
  institution_name: string;
  institution_email: string;
  description: string;
  year_established: string;
  official_website: string;
  institution_logo: string;
  primary_contact: PrimaryContact;
  address: InstitutionAddress;
  legal_information: LegalInformation;
  bank_information: BankInformation;
  terms_acceptance: boolean;
  policy_acceptance: boolean;
  educational_consent: boolean;
  isVerified: boolean;
  created_at: string;
  updated_at: string;
}

/* =========================================================
   REQUESTS — matches your ERD
   Currently only "Institution Onboarding" requests exist,
   but request_type is kept generic for future request kinds.
========================================================= */

export type RequestStatusKey = "Submitted" | "In Progress" | "Approved" | "Rejected" | "Resubmitted";

export interface RequestStatusTimelineEntry {
  status: RequestStatusKey;
  timestamp: string;
  note?: string;
}

export interface InstitutionRequest {
  request_id: string;
  request_type: string;
  submitted_by: string;
  submitted_on: string;
  status_timeline: RequestStatusTimelineEntry[];
  is_approved: boolean;
}

/* Which statuses a request can move to next, from its current status. */
export const NEXT_STATUS_OPTIONS: Record<RequestStatusKey, { value: RequestStatusKey; label: string }[]> = {
  Submitted: [
    { value: "In Progress", label: "Move to In Progress" },
  ],
  "In Progress": [
    { value: "Approved", label: "Approve Application" },
    { value: "Rejected", label: "Reject Application" },
  ],
  Approved: [],
  Rejected: [],
  Resubmitted : [
    { value: "In Progress", label: "Move to In Progress" },
  ]
};


export interface Qualification {
  title: string;
  type: string;
  institution: string;
  issue_date: string;
  document_url: string;
}

export interface Instructor {
  _id: string;
  institution_id: string;
  instructor_id: string;
  instructor_mail: string;
  /**
   * Only ever meaningful at creation time (set once, then handed to the
   * instructor). Never fetched back or displayed anywhere after that —
   * keep it out of any "view instructor" screen.
   */
  instructor_password: string;
  first_name: string;
  last_name: string;
  age: number;
  date_of_birth: string;
  personal_email: string;
  about: string;
  isBlocked: boolean;
  role: string;
  qualification: Qualification;
  created_at: string;
  updated_at: string;
}




