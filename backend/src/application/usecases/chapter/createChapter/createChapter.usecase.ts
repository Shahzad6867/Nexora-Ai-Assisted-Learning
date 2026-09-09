import { Chapter } from "../../../../domain/entities/chapter.entity";
import { IdPrefix } from "../../../../domain/enums/idPrefix.enum";
import { IChapterRepository } from "../../../../domain/repositories/chapter.repository";
import { IChapterDocument } from "../../../../infrastructure/mongodb/models/chapter.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { CreateChapterDTO } from "../../../dtos/chapter.dto";
import { Result } from "../../../helpers/result";
import { IEntityIdGenerator } from "../../../interfaces/IEntityIdGenerator.interface";
import { ICreateChapterUseCase } from "./ICreateChapter.usecase";

export class CreateChapterUseCase implements ICreateChapterUseCase {
  constructor(
    private readonly _chapterRepository: IChapterRepository,
    private readonly _entityIdGenerator: IEntityIdGenerator
  ) {}
  async execute(dto: CreateChapterDTO): Promise<Result<IChapterDocument>> {
    const chapterId = this._entityIdGenerator.generate(IdPrefix.CHAPTER);
    const chapter = new Chapter(
      dto.subject_id,
      chapterId,
      dto.chapter_name,
      dto.chapter_pdf ?? null,
      dto.chapter_tutorial ?? null,
      dto.is_published
    );

    const newChapter = await this._chapterRepository.create(chapter);
    return Result.success(newChapter, HTTP_STATUS_CODES.CREATED);
  }
}
