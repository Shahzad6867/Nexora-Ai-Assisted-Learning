import { User } from "../../../../domain/entities/user.entity";
import { IdPrefix } from "../../../../domain/enums/idPrefix.enum";
import { IUserRepository } from "../../../../domain/repositories/user.repository";
import {
  RegisterUserDTO
} from "../../../dtos/user.dto";
import { IEntityIdGenerator } from "../../../interfaces/IEntityIdGenerator.interface";
import { IRegisterUserUseCase } from "./IRegisterUser.usecase";

export class RegisterUserUseCase implements IRegisterUserUseCase{
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _entityIdGenerator: IEntityIdGenerator
  ) {}
  async execute(dto: RegisterUserDTO): Promise<string> {
    let studentId = "";
    let idExists = true;
    while (idExists) {
      const id = this._entityIdGenerator.generate(IdPrefix.STUDENT);
      const userExist = await this._userRepository.getById(id);
      if (userExist === null) {
        studentId = id;
        idExists = false;
      }
    }

    const user = new User(
      studentId,
      dto.first_name,
      dto.last_name,
      dto.age,
      new Date(dto.date_of_birth),
      dto.email,
      dto.password,
      dto.profile_image,
      false,
      dto.role,
      dto.google_id ?? null
    );
    await this._userRepository.create(user);
    return studentId;
  }
}
