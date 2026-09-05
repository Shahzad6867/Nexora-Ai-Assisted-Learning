import { Instructor } from "../../../../domain/entities/instructor.entity";
import { CreateInstructorDTO } from "../../../dtos/instructor.dto";
import { Result } from "../../../helpers/result";

export interface ICreateInstructorUseCase {
    execute : (dto : CreateInstructorDTO) => Promise<Result<Instructor>>
}