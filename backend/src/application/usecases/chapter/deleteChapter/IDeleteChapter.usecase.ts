import { Result } from "../../../helpers/result";

export interface IDeleteChapterUseCase {
  execute: (chapter_id : string) => Promise<Result<boolean>>;
}
