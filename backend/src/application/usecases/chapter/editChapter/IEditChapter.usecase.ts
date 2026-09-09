import { IChapterDocument } from "../../../../infrastructure/mongodb/models/chapter.model";
import { CreateChapterDTO, UpdateChapterDTO } from "../../../dtos/chapter.dto";
import { Result } from "../../../helpers/result";

export interface IEditChapterUseCase {
  execute: (chapter_id : string,dto: UpdateChapterDTO) => Promise<Result<IChapterDocument | null>>;
}
