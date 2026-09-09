export class Subject {
  constructor(
    public readonly module_id: string,
    public readonly subject_id: string,
    public subject_name: string,
    public description: string,
    public assignment_name: string | null,
    public assignment_guidline: string | null,
    public instructor_id: string
  ) {}
}
