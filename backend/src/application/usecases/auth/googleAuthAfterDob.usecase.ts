import env from "../../../config/env.config";
import { IGoogleUserRepository } from "../../../domain/repositories/googleUser.repository";
import {
  GoogleUserDobDTO,
  RegisterUserDTO,
  RegisterUserResponseDTO,
} from "../../dtos/user.dto";
import { IDobAndAgeValidator } from "../../interfaces/IDobAndAgeValidator.interface";
import { IMailService } from "../../interfaces/IMailService.interface";
import { RegisterUserUseCase } from "./registerUser.usecase";
import jwt from "jsonwebtoken"

export class GoogleAuthAfterDobUseCase {
  constructor(
    private readonly googleUserRepository: IGoogleUserRepository,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly dobAndAgeValidator: IDobAndAgeValidator,
    private readonly mailService: IMailService
  ) {}
  async execute(dto: GoogleUserDobDTO): Promise<string> {
    const user = await this.googleUserRepository.findById(dto._id);

    if (user === null) {
      throw new Error(
        "Registration details has been expired!, Please register once again"
      );
    }

    const isDobValid = this.dobAndAgeValidator.validate(
      dto.date_of_birth,
      dto.age
    );

    if (!isDobValid) {
      throw new Error("Provided Date of Birth or Age is invalid");
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
    const userId = await this.registerUserUseCase.execute(registerUserDTO);
    await this.googleUserRepository.delete(user._id);
    await this.mailService.sendAccountVerified(user.data.email);

    const token = jwt.sign({_id : userId,role : user.data.role},env.JWT_SECRET_KEY!,{expiresIn : "3h"})
    return token
  }
}
