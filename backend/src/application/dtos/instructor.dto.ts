export interface CreateInstructorDTO {
  institution_id: string;
  instructor_id: string;
  instructor_mail: string;
  instructor_password: string;
  first_name: string;
  last_name: string;
  age: number;
  date_of_birth: Date;
  personal_email: string;
  about: string;
  isBlocked: boolean;
  role: string;
  qualification: {
    title: string;
    type: string;
    institution: string;
    issue_date: Date;
    document_url: string;
  };
}
