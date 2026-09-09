import { CreateChapterUseCase } from "../../application/usecases/chapter/createChapter/createChapter.usecase";
import { DeleteChapterUseCase } from "../../application/usecases/chapter/deleteChapter/deleteChapter.usecase";
import { EditChapterUseCase } from "../../application/usecases/chapter/editChapter/editChapter.usecase";
import { GetChapterUseCase } from "../../application/usecases/chapter/getChapter/getChapter.usecase";
import { EntityIdGenerator } from "../../infrastructure/adapters/EntityIdGenerator.adapter";
import ChapterModel from "../../infrastructure/mongodb/models/chapter.model";
import { ChapterRepository } from "../../infrastructure/repositories/chapter.repository";
import { ChapterController } from "../controllers/chapter.controller";

export class ChapterFactory {
  static create(): ChapterController {
    const repository = new ChapterRepository(ChapterModel);
    const entityIdGenerator = new EntityIdGenerator();
    const createChapterUseCase = new CreateChapterUseCase(
      repository,
      entityIdGenerator
    );
    const deleteChapterUseCase = new DeleteChapterUseCase(repository)
    const getChapterUseCase = new GetChapterUseCase(repository)
    const editChapterUseCase = new EditChapterUseCase(repository)
    const controller = new ChapterController(
      createChapterUseCase,
      deleteChapterUseCase,
      getChapterUseCase,
      editChapterUseCase
    );
    return controller;
  }
}
