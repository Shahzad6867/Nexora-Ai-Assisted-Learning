import { IInstructorRepository } from "../../../domain/repositories/instructor.repository";

export class GetInstructorsUseCase {
    constructor(
        private readonly instructorRepository : IInstructorRepository
    ){}
    async execute(){
        return await this.instructorRepository.getAll()
    }
}