import { RegisterUserDTO } from "../../../dtos/user.dto";

export interface IRegisterUserUseCase {
    execute : (dto : RegisterUserDTO) => Promise<string>
}