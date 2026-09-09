export interface CreateChapterDTO {
  subject_id: string;
  chapter_name: string;
  chapter_pdf: string | null;
  chapter_tutorial: string | null;
  is_published: boolean;
}
export interface UpdateChapterDTO {
    subject_id: string;
    chapter_name: string;
    chapter_pdf: string | null;
    chapter_tutorial: string | null;
    is_published: boolean;
  }
  
