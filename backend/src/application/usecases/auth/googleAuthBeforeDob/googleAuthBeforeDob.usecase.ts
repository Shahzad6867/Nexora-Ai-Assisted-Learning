import env from "../../../../config/env.config";
import { Roles } from "../../../../domain/enums/roles.enum";
import { IGoogleUserRepository } from "../../../../domain/repositories/googleUser.repository";
import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { GoogleAuthResponseDTO, GoogleUserDTO } from "../../../dtos/user.dto";
import { IRegistrationIdGenerator } from "../../../interfaces/IRegistrationIdGenerator.interface";
import jwt from "jsonwebtoken";
import { Result } from "../../../helpers/result";
import { IGoogleAuthBeforeDobUseCase } from "./IGoogleAuthBeforeDob.usecase";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { ITokenGenerator } from "../../../interfaces/ITokenGenerator.interface";
export class GoogleAuthBeforeDobUseCase implements IGoogleAuthBeforeDobUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _googleUserRepository: IGoogleUserRepository,
    private readonly _registrationIdGenerator: IRegistrationIdGenerator,
    private readonly _tokenGenerator : ITokenGenerator
  ) {}
  async execute(dto: GoogleUserDTO): Promise<Result<GoogleAuthResponseDTO>> {
    const existingUser = await this._userRepository.getByEmail(dto.email);
    if (existingUser) {
      const accessToken = this._tokenGenerator.generateAccessToken({
        _id: existingUser.student_id,
        role: existingUser.role,
      });
      const refreshToken = this._tokenGenerator.generateRefreshToken({
        _id: existingUser.student_id,
        role: existingUser.role,
      });
      return Result.success({
        url : `${env.FRONTEND_URL}/?accessToken=${accessToken}`,
        refreshToken
      }, HTTP_STATUS_CODES.OK);
    }
    dto.role = Roles.STUDENT;
    const id = this._registrationIdGenerator.generate();
    this._googleUserRepository.save(
      { _id: id, data: dto },
      env.REDIS_AUTH_DOCUMENT_EXPIRES_IN
    );
    const url = `${env.FRONTEND_URL}/${Roles.STUDENT}/dob/verification/${id}`;
    return Result.success<GoogleAuthResponseDTO>({url}, HTTP_STATUS_CODES.OK);
  }
}
