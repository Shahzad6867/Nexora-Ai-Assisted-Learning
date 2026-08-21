import env from "../../../config/env.config";
import { IGoogleUserRepository } from "../../../domain/repositories/googleUser.repository";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { GoogleUserDTO } from "../../dtos/user.dto";
import { RegisterUserResponseDTO } from "../../dtos/user.dto";
import { IRegistrationIdGenerator } from "../../interfaces/IRegistrationIdGenerator.interface";
import jwt from "jsonwebtoken"
export class GoogleAuthBeforeDobUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly googleUserRepository: IGoogleUserRepository,
    private readonly registrationIdGenerator: IRegistrationIdGenerator
  ) {}
  async execute(dto: GoogleUserDTO): Promise<string> {
    const existingUser = await this.userRepository.getByEmail(dto.email);
    if (existingUser) {
      const token = jwt.sign({_id : existingUser.student_id,role : existingUser.role},env.JWT_SECRET_KEY!,{expiresIn : "3h"})
      return `${env.FRONTEND_URL}?token=${token}`;
    }
    dto.role = "student";
    const id = this.registrationIdGenerator.generate();
    this.googleUserRepository.save({ _id: id, data: dto }, 600);
    return `${env.FRONTEND_URL}student/dob/verification/${id}`;
  }
}
