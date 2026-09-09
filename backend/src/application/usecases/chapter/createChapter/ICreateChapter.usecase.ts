import { IChapterDocument } from "../../../../infrastructure/mongodb/models/chapter.model";
import { CreateChapterDTO } from "../../../dtos/chapter.dto";
import { Result } from "../../../helpers/result";

export interface ICreateChapterUseCase {
  execute: (dto: CreateChapterDTO) => Promise<Result<IChapterDocument>>;
}
