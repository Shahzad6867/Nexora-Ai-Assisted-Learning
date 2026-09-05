import jwt from "jsonwebtoken";
import { IInstitutionRepository } from "../../../../domain/repositories/institution.repository";
import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { LoginCredentialsDTO } from "../../../dtos/user.dto";
import env from "../../../../config/env.config";
import { IPassswordAdapter } from "../../../interfaces/IPasswordAdapter.interface";
import { IInstructorRepository } from "../../../../domain/repositories/instructor.repository";
import { Roles } from "../../../../domain/enums/roles.enum";
import { Result } from "../../../helpers/result";
import { AppError } from "../../../../presentation/error/app.error";
import { IVerifyLoginCredentialsUseCase } from "./IVerifyLoginCredentials.usecase";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { IAdminRepository } from "../../../../domain/repositories/admin.repository";
import { AUTH_USECASE_MESSAGES } from "../auth.usecase.messages";
import { ITokenGenerator } from "../../../interfaces/ITokenGenerator.interface";
import { TokenResponseDTO } from "../../../dtos/otp.dto";

export class VerifyLoginCredentialsUseCase implements IVerifyLoginCredentialsUseCase{
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _adminRepository: IAdminRepository,
    private readonly _institutionRepository: IInstitutionRepository,
    private readonly _instructorRepository: IInstructorRepository,
    private readonly _passwordAdapter: IPassswordAdapter,
    private readonly _tokenGenerator : ITokenGenerator
  ) {}
  async execute(dto: LoginCredentialsDTO) : Promise<Result<TokenResponseDTO>> {
    let response = null;
    if (dto.role === Roles.STUDENT) {
      const student = await this._userRepository.getByEmail(dto.email);
      if (!student) {
        throw new AppError(AUTH_USECASE_MESSAGES.USER_DOES_NOT_EXIST, HTTP_STATUS_CODES.NOT_FOUND);
      }
      if (student.is_blocked) {
        throw new AppError(AUTH_USECASE_MESSAGES.USER_BLOCKED, HTTP_STATUS_CODES.GONE);
      }
      if (student.google_id !== null && dto.password !== null) {
        throw new AppError(
          AUTH_USECASE_MESSAGES.GOOGLE_REGISTERED_USER,
          HTTP_STATUS_CODES.BAD_REQUEST
        );
      }
      const isPassCorrect = await this._passwordAdapter.compare(
        dto.password,
        student.password!
      );
      if (!isPassCorrect) {
        throw new AppError(AUTH_USECASE_MESSAGES.INCORRECT_PASSWORD, HTTP_STATUS_CODES.BAD_REQUEST);
      }

      response = student.student_id;
    } else if (dto.role === Roles.INSTITUTION) {
      const institution = await this._institutionRepository.getByEmail(
        dto.email
      );

      if (!institution) {
        throw new AppError(AUTH_USECASE_MESSAGES.INSTITUTION_DOES_NOT_EXIST, HTTP_STATUS_CODES.NOT_FOUND);
      }
      if (institution.isBlocked) {
        throw new AppError(AUTH_USECASE_MESSAGES.INSTITUTION_BLOCKED, HTTP_STATUS_CODES.GONE);
      }
      const isPassCorrect = await this._passwordAdapter.compare(
        dto.password,
        institution.password!
      );
      if (!isPassCorrect) {
        throw new AppError(AUTH_USECASE_MESSAGES.INCORRECT_PASSWORD, HTTP_STATUS_CODES.BAD_REQUEST);
      }
      response = institution.institution_id;
    } else if (dto.role === Roles.INSTRUCTOR) {
      const instructor = await this._instructorRepository.getByEmail(dto.email);
      if (!instructor) {
        throw new AppError(AUTH_USECASE_MESSAGES.UNAUTHORIZED_USER, HTTP_STATUS_CODES.FORBIDDEN);
      }
      if (instructor.is_blocked) {
        throw new AppError(AUTH_USECASE_MESSAGES.INSTRUCTOR_BLOCKED, HTTP_STATUS_CODES.GONE);
      }
      const isPassCorrect = await this._passwordAdapter.compare(
        dto.password,
        instructor.instructor_password!
      );
      if (!isPassCorrect) {
        throw new AppError(AUTH_USECASE_MESSAGES.INCORRECT_PASSWORD, HTTP_STATUS_CODES.BAD_REQUEST);
      }
      response = instructor.instructor_id;
    } else if (dto.role === Roles.ADMIN) {
      const admin = await this._adminRepository.getByEmail(dto.email);
      if (!admin) {
        throw new AppError(AUTH_USECASE_MESSAGES.UNAUTHORIZED_USER, HTTP_STATUS_CODES.FORBIDDEN); 
      }
      const isPassCorrect = await this._passwordAdapter.compare(
        dto.password,
        admin.password!
      );
      if (!isPassCorrect) {
        throw new AppError(AUTH_USECASE_MESSAGES.INCORRECT_PASSWORD, HTTP_STATUS_CODES.BAD_REQUEST);
      }
      response = admin.name;
    }
    const accessToken = this._tokenGenerator.generateAccessToken({ _id : response,role : dto.role})
    const refreshToken = this._tokenGenerator.generateRefreshToken({ _id : response,role : dto.role})
    return Result.success<TokenResponseDTO>({
      accessToken,
      refreshToken
    }, HTTP_STATUS_CODES.OK);
  }
}
