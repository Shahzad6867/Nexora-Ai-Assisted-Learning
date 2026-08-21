import { IUserRepository } from "../../../domain/repositories/user.repository";


export class GetStudentsUseCase {
    constructor(private readonly userRepository : IUserRepository){}
    async execute(){
        return await this.userRepository.getAll()
    }
}