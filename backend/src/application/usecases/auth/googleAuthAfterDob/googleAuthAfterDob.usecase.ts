import env from "../../../../config/env.config";
import { IGoogleUserRepository } from "../../../../domain/repositories/googleUser.repository";
import { AppError } from "../../../../presentation/error/app.error";
import {
  GoogleUserDobDTO,
  RegisterUserDTO
} from "../../../dtos/user.dto";
import { IDobAndAgeValidator } from "../../../interfaces/IDobAndAgeValidator.interface";
import { IMailService } from "../../../interfaces/IMailService.interface";
import { Result } from "../../../helpers/result";
import { RegisterUserUseCase } from "../registerUser/registerUser.usecase";
import jwt from "jsonwebtoken";
import { IGoogleAuthAfterDobUseCase } from "./IGoogleAuthAfterDob.usecase";
import { HTTP_STATUS_CODES } from "../../../../presentation/controllers/httpStatusCodes/httpStatusCodes.enum";
import { AUTH_USECASE_MESSAGES } from "../auth.usecase.messages";
import { ITokenGenerator } from "../../../interfaces/ITokenGenerator.interface";
import { TokenResponseDTO } from "../../../dtos/otp.dto";

export class GoogleAuthAfterDobUseCase implements IGoogleAuthAfterDobUseCase {
  constructor(
    private readonly _googleUserRepository: IGoogleUserRepository,
    private readonly _registerUserUseCase: RegisterUserUseCase,
    private readonly _dobAndAgeValidator: IDobAndAgeValidator,
    private readonly _mailService: IMailService,
    private readonly _tokenGenerator : ITokenGenerator
  ) {}
  async execute(dto: GoogleUserDobDTO): Promise<Result<TokenResponseDTO>> {
    const user = await this._googleUserRepository.findById(dto._id);

    if (user === null) {
      throw new AppError(
        AUTH_USECASE_MESSAGES.REGISTERATION_DETAILS_EXPIRED,
        HTTP_STATUS_CODES.BAD_REQUEST
      );
    }

    const isDobValid = this._dobAndAgeValidator.validate(
      dto.date_of_birth,
      dto.age
    );

    if (!isDobValid) {
      throw new AppError(AUTH_USECASE_MESSAGES.INVALID_DOB, HTTP_STATUS_CODES.BAD_REQUEST);
    }
    const registerUserDTO: RegisterUserDTO = {
      first_name: user.data.first_name,
      last_name: user.data.last_name,
      age: dto.age,
      date_of_birth: dto.date_of_birth,
      email: user.data.email,
      profile_image: user.data.profile_image,
      password: null,
      role: user.data.role!,
      google_id: user.data.google_id,
    };
    const userId = await this._registerUserUseCase.execute(registerUserDTO);
    await this._googleUserRepository.delete(user._id);
    await this._mailService.sendAccountVerified(user.data.email);
    const accessToken = this._tokenGenerator.generateAccessToken({ _id : userId,role : user.data.role})
    const refreshToken = this._tokenGenerator.generateRefreshToken({ _id : userId ,role : user.data.role})
    return Result.success<TokenResponseDTO>({
      accessToken,
      refreshToken
    }, HTTP_STATUS_CODES.CREATED);
  }
}
