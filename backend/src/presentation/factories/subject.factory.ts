import { CreateSubjectUseCase } from "../../application/usecases/subject/createSubject/createSubject.usecase";
import { GetSubjectUseCase } from "../../application/usecases/subject/getSubject/getSubject.usecase";
import { GetSubjectsByInstructorIdUseCase } from "../../application/usecases/subject/getSubjectsByInstructorId/getSubjectsByInstructorId.usecase";
import { UpdateSubjectUseCase } from "../../application/usecases/subject/updateSubject/updateSubject.usecase";
import { EntityIdGenerator } from "../../infrastructure/adapters/EntityIdGenerator.adapter";
import ChapterModel from "../../infrastructure/mongodb/models/chapter.model";
import SubjectModel from "../../infrastructure/mongodb/models/subject.model";
import { ChapterRepository } from "../../infrastructure/repositories/chapter.repository";
import { SubjectRepository } from "../../infrastructure/repositories/subject.repository";
import { SubjectController } from "../controllers/subject.controller";

export class SubjectFactory {
  static create(): SubjectController {
    const repository = new SubjectRepository(SubjectModel);
    const chapterRepository = new ChapterRepository(ChapterModel);
    const entityIdGenerator = new EntityIdGenerator();
    const createSubjectUseCase = new CreateSubjectUseCase(
      repository,
      entityIdGenerator
    );
    const updateSubjectUseCase = new UpdateSubjectUseCase(repository);
    const getSubjectsByInstructorIdUseCase =
      new GetSubjectsByInstructorIdUseCase(repository);
    const getSubjectUseCase = new GetSubjectUseCase(repository,chapterRepository);
    const controller = new SubjectController(
      createSubjectUseCase,
      updateSubjectUseCase,
      getSubjectsByInstructorIdUseCase,
      getSubjectUseCase
    );
    return controller;
  }
}
