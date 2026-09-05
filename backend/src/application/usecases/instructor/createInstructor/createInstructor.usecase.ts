import { Instructor } from "../../../../domain/entities/instructor.entity";
import { IdPrefix } from "../../../../domain/enums/idPrefix.enum";
import { Roles } from "../../../../domain/enums/roles.enum";
import { IInstructorRepository } from "../../../../domain/repositories/instructor.repository";
import { AppError } from "../../../../presentation/error/app.error";
import { CreateInstructorDTO } from "../../../dtos/instructor.dto";
import { IEntityIdGenerator } from "../../../interfaces/IEntityIdGenerator.interface";
import { IPassswordAdapter } from "../../../interfaces/IPasswordAdapter.interface";
import { Result } from "../../../helpers/result";
import { ICreateInstructorUseCase } from "./ICreateInstructor.usecase";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { INSTRUCTOR_MESSAGES } from "../instructor.usecase.messages";

export class CreateInstructorUseCase implements ICreateInstructorUseCase {
  constructor(
    private readonly _instructorRespository: IInstructorRepository,
    private readonly _entityIdGenerator: IEntityIdGenerator,
    private readonly _passwordAdapter: IPassswordAdapter
  ) {}
  async execute(dto: CreateInstructorDTO) : Promise<Result<Instructor>> {
    const existingInstructor = await this._instructorRespository.getByEmail(
      dto.instructor_mail
    );
    if (existingInstructor !== null)
      throw new AppError(INSTRUCTOR_MESSAGES.ALREADY_EXISTS, HTTP_STATUS_CODES.CONFLICT);
    const instructor_id = this._entityIdGenerator.generate(IdPrefix.INSTRUCTOR);
    const password = await this._passwordAdapter.hash(dto.instructor_password);
    const instructor = new Instructor(
      dto.institution_id,
      instructor_id,
      dto.instructor_mail,
      password,
      null,
      dto.first_name,
      dto.last_name,
      dto.age,
      dto.date_of_birth,
      dto.personal_email,
      dto.about,
      false,
      Roles.INSTRUCTOR,
      {
        title: dto.qualification.title,
        type: dto.qualification.type,
        institution: dto.qualification.institution,
        issue_date: dto.qualification.issue_date,
        document_url: dto?.qualification?.document_url ?? null,
      }
    );

    await this._instructorRespository.create(instructor);
    return Result.success<Instructor>(instructor, HTTP_STATUS_CODES.CREATED);
  }
}
