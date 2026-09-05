import { Instructor } from "../../../../domain/entities/instructor.entity";
import { User } from "../../../../domain/entities/user.entity";
import { Roles } from "../../../../domain/enums/roles.enum";
import { IInstitutionRepository } from "../../../../domain/repositories/institution.repository";
import { IInstructorRepository } from "../../../../domain/repositories/instructor.repository";
import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { IInstitutionDocument } from "../../../../infrastructure/mongodb/models/institution.model";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AppError } from "../../../../presentation/error/app.error";
import { UpdateIsBlockedDTO } from "../../../dtos/admin.dto";
import { Result } from "../../../helpers/result";
import { INSTITUTION_MESSAGES } from "../../institution/institution.usecase.messages";
import { INSTRUCTOR_MESSAGES } from "../../instructor/instructor.usecase.messages";
import { USER_MESSAGES } from "../../user/user.usecase.messages";
import { IUpdateIsBlockedEntitytUseCase } from "./IUpdateIsBlockedEntity.usecase";

export class UpdateIsBlockedEntityUseCase
  implements IUpdateIsBlockedEntitytUseCase
{
  constructor(
    private readonly _studentRepository: IUserRepository,
    private readonly _institutionRepository: IInstitutionRepository,
    private readonly _instructorRepository: IInstructorRepository
  ) {}
  async execute(
    dto: UpdateIsBlockedDTO
  ): Promise<Result<User | IInstitutionDocument | Instructor | null>> {
    let data = null;
    if (dto.role === Roles.STUDENT) {
      const student = await this._studentRepository.getById(dto._id);
      if (!student) {
        throw new AppError(
          USER_MESSAGES.NOT_FOUND,
          HTTP_STATUS_CODES.NOT_FOUND
        );
      }
      const updatedStudent = new User(
        student.student_id,
        student.first_name,
        student.last_name,
        student.age,
        student.date_of_birth,
        student.email,
        student.password,
        student.profile_image,
        !student.is_blocked,
        student.role,
        student?.google_id
      );
      await this._studentRepository.update(updatedStudent.student_id,updatedStudent);
      data = updatedStudent;
    } else if (dto.role === Roles.INSTITUTION) {
      const institution = await this._institutionRepository.getById(dto._id);
      if (!institution) {
        throw new AppError(
          INSTITUTION_MESSAGES.NOT_FOUND,
          HTTP_STATUS_CODES.NOT_FOUND
        );
      }
      const updatedInstitution = await this._institutionRepository.update(
        dto._id,
        { isBlocked: !institution.isBlocked }
      );
      data = updatedInstitution;
    } else if (dto.role === Roles.INSTRUCTOR) {
      const instructor = await this._instructorRepository.getById(dto._id);
      if (!instructor) {
        throw new AppError(
          INSTRUCTOR_MESSAGES.NOT_FOUND,
          HTTP_STATUS_CODES.NOT_FOUND
        );
      }
      const updatedInstructor = new Instructor(
        instructor.institution_id,
        instructor.instructor_id,
        instructor.instructor_mail,
        instructor.instructor_password,
        instructor.instructor_profile,
        instructor.first_name,
        instructor.last_name,
        instructor.age,
        instructor.date_of_birth,
        instructor.personal_email,
        instructor.about,
        !instructor.is_blocked,
        instructor.role,
        instructor.qualification
      );
      await this._instructorRepository.update(updatedInstructor.instructor_id,updatedInstructor);
      data = updatedInstructor;
    }

    return Result.success<User | IInstitutionDocument | Instructor | null>(
      data,
      HTTP_STATUS_CODES.OK
    );
  }
}
