import { User } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { RegisterUserDTO, RegisterUserResponseDTO } from "../../dtos/user.dto";
import { IEntityIdGenerator } from "../../interfaces/IEntityIdGenerator.interface";

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly entityIdGenerator: IEntityIdGenerator
  ) {}
  async execute(dto: RegisterUserDTO): Promise<string> {
    let studentId = "";
    let idExists = true;
    while (idExists) {
      const id = this.entityIdGenerator.generate("STUD");
      const userExist = await this.userRepository.getById(id);
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
    await this.userRepository.create(user);
    return studentId;
  }
}
