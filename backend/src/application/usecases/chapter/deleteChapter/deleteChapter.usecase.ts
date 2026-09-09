import { IChapterRepository } from "../../../../domain/repositories/chapter.repository";
import { IChapterDocument } from "../../../../infrastructure/mongodb/models/chapter.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { Result } from "../../../helpers/result";
import { CHAPTER_MESSAGES } from "../chapter.usecase.messages";
import { IDeleteChapterUseCase } from "./IDeleteChapter.usecase";

export class DeleteChapterUseCase implements IDeleteChapterUseCase {
  constructor(
    private readonly _chapterRepository: IChapterRepository
  ) {}
  async execute(chapter_id : string): Promise<Result<boolean>> {
    const isDeleted = await this._chapterRepository.delete(chapter_id)
    if(!isDeleted){
      throw new AppError(CHAPTER_MESSAGES.NOT_FOUND,HTTP_STATUS_CODES.NOT_FOUND)
    }
    return Result.success(true, HTTP_STATUS_CODES.OK);
  }
}
