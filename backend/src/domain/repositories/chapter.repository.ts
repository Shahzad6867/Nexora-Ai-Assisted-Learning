import { IChapterDocument } from "../../infrastructure/mongodb/models/chapter.model";
import { Chapter } from "../entities/chapter.entity";

export interface IChapterRepository {
  getById: (chapter_id: string) => Promise<IChapterDocument | null>;
  getAllBySubjectId : (subject_id : string) => Promise<IChapterDocument[]>;
  update: (chapter_id : string,chapter: Chapter) => Promise<IChapterDocument | null>;
  create: (chapter: Chapter) => Promise<IChapterDocument>;
  delete: (chapter_id : string) => Promise<boolean | null>
}