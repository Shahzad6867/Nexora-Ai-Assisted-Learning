import { IChapterDocument } from "../../../../infrastructure/mongodb/models/chapter.model";
import { Result } from "../../../helpers/result";

export interface IGetChapterUseCase {
  execute: (chapter_id : string) => Promise<Result<IChapterDocument>>;
}
