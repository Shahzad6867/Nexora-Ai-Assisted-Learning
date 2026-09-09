export class Chapter {
  constructor(
    public readonly subject_id: string,
    public readonly chapter_id: string,
    public chapter_name: string,
    public chapter_pdf: string | null,
    public chapter_tutorial: string | null,
    public is_published: boolean
  ) {}
}
