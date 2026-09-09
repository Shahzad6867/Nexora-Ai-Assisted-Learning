export interface CreateCourseRequestDTO {
  institution_id: string;

  course_name: string;

  course_subtitle: string;

  course_category: string;

  description: string;

  price: number;

  price_per_module: number;
}
export interface UpdateCourseRequestDTO {
  course_name: string;

  course_subtitle: string;

  course_category: string;

  description: string;

  price: number;

  price_per_module: number;
}

export interface GetCourseResponseDTO {
  institution_id?: string;

  course_id?: string;

  course_name ?: string;

  course_subtitle ?: string;

  course_category ?: string;

  course_banner ?: string | null;

  description ?: string;

  price ?: number;

  price_per_module ?: number;

  is_archived ?: boolean;
  is_published ?: boolean;
  is_approved ?: boolean;
  createdAt ?: Date;
  updatedAt ?: Date;

  modules?: any[];
  
}
