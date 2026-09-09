import { Chapter } from "../../../../domain/entities/chapter.entity";
import { IdPrefix } from "../../../../domain/enums/idPrefix.enum";
import { IChapterRepository } from "../../../../domain/repositories/chapter.repository";
import { IChapterDocument } from "../../../../infrastructure/mongodb/models/chapter.model";
import { ISubjectDocument } from "../../../../infrastructure/mongodb/models/subject.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { UpdateChapterDTO } from "../../../dtos/chapter.dto";
import { Result } from "../../../helpers/result";
import { IEntityIdGenerator } from "../../../interfaces/IEntityIdGenerator.interface";
import { CHAPTER_MESSAGES } from "../chapter.usecase.messages";
import { IEditChapterUseCase } from "./IEditChapter.usecase";


export class EditChapterUseCase implements IEditChapterUseCase {
  constructor(
    private readonly _chapterRepository: IChapterRepository,
  ) {}
  async execute(chapter_id : string,dto: UpdateChapterDTO): Promise<Result<IChapterDocument | null>> {
    const chapterToBeUpdated = await this._chapterRepository.getById(chapter_id)
    if(!chapterToBeUpdated){
      throw new AppError(CHAPTER_MESSAGES.NOT_FOUND,HTTP_STATUS_CODES.NOT_FOUND)
    }

    const subject : ISubjectDocument = chapterToBeUpdated.subject_id as unknown as ISubjectDocument
    const chapter = new Chapter(
      subject.subject_id,
      chapterToBeUpdated.chapter_id,
      dto.chapter_name,
      dto.chapter_pdf ?? chapterToBeUpdated.chapter_pdf as string | null,
      dto.chapter_tutorial ?? chapterToBeUpdated.chapter_tutorial as string | null,
      dto.is_published
    );

    const updatedChapter = await this._chapterRepository.update(chapter_id,chapter)

    return Result.success(updatedChapter, HTTP_STATUS_CODES.OK);
  }
}
