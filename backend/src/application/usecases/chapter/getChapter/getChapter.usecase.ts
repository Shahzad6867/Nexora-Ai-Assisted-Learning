import { Chapter } from "../../../../domain/entities/chapter.entity";
import { IdPrefix } from "../../../../domain/enums/idPrefix.enum";
import { IChapterRepository } from "../../../../domain/repositories/chapter.repository";
import { IChapterDocument } from "../../../../infrastructure/mongodb/models/chapter.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { CreateChapterDTO } from "../../../dtos/chapter.dto";
import { Result } from "../../../helpers/result";
import { IEntityIdGenerator } from "../../../interfaces/IEntityIdGenerator.interface";
import { CHAPTER_MESSAGES } from "../chapter.usecase.messages";
import { IGetChapterUseCase } from "./IGetChapter.usecase";

export class GetChapterUseCase implements IGetChapterUseCase {
  constructor(
    private readonly _chapterRepository: IChapterRepository
  ) {}
  async execute(chapter_id : string): Promise<Result<IChapterDocument>> {
    const chapter = await this._chapterRepository.getById(chapter_id)
    if(!chapter){
      throw new AppError(CHAPTER_MESSAGES.NOT_FOUND,HTTP_STATUS_CODES.NOT_FOUND)
    }
    return Result.success(chapter, HTTP_STATUS_CODES.OK);
  }
}
