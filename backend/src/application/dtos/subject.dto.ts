export interface CreateSubjectDTO {
  module_id: string;
  subject_name: string;
  description: string;
  instructor_id: string;
}
export interface UpdateSubjectRequestDTO {
    subject_name: string;
    description: string;
    instructor_id: string;
  }
  
  export interface GetSubjectResponseDTO {
    module_id: string;
    subject_id: string;
    subject_name: string;
    description: string;
    instructor_id: string;
    chapters : any[]
  }