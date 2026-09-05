export interface CreateCourseRequestDTO {
  institution_id: string;

  course_name: string;

  course_subtitle: string;

  course_category : string;

  description: string;

  price: number;

  price_per_module: number;
}
