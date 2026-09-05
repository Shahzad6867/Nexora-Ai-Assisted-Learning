import { Course } from "../../../../domain/entities/course.entity";
import { IdPrefix } from "../../../../domain/enums/idPrefix.enum";
import { ICourseRepository } from "../../../../domain/repositories/course.repository";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { CreateCourseRequestDTO } from "../../../dtos/course.dto";
import { Result } from "../../../helpers/result";
import { IEntityIdGenerator } from "../../../interfaces/IEntityIdGenerator.interface";
import { ICreateCourseUseCase } from "./ICreateCourse.usecase";

export class CreateCourseUseCase implements ICreateCourseUseCase {
  constructor(
    private readonly _courseRepository: ICourseRepository,
    private readonly _entityIdGenerator: IEntityIdGenerator
  ) {}
  async execute(dto: CreateCourseRequestDTO): Promise<Result<Course>> {
    const courseId = this._entityIdGenerator.generate(IdPrefix.COURSE);
    const course = new Course(
      dto.institution_id,
      courseId,
      dto.course_name,
      dto.course_subtitle,
      dto.description,
      dto.course_category,
      null,
      dto.price,
      dto.price_per_module,
      false,
      false,
      false
    );
    await this._courseRepository.create(course);
    return Result.success(course, HTTP_STATUS_CODES.CREATED);
  }
}
