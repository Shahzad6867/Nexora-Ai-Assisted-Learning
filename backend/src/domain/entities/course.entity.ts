export class Course {
  constructor(
    public readonly institution_id : string,
    public readonly course_id : string,
    public course_name : string ,
    public course_subtitle : string ,
    public description : string,
    public course_category : string ,
    public course_banner : string | null,
    public price : number,
    public price_per_module : number,
    public is_archived : boolean,
    public is_published : boolean,
    public is_approved : boolean,
  ) {}
}
