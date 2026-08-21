export class Instructor {
  constructor(
    public readonly institution_id: string,
    public readonly instructor_id: string,
    public instructor_mail: string,
    public instructor_password: string,
    public instructor_profile: string | null,
    public first_name: string,
    public last_name: string,
    public age: number,
    public date_of_birth: Date,
    public personal_email: string,
    public about: string,
    public isBlocked: boolean,
    public role: string,
    public qualification: {
      title: string;
      type: string;
      institution: string;
      issue_date: Date;
      document_url: string;
    }
  ) {}
}
