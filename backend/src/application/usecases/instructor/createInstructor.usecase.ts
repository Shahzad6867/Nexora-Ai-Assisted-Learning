import { Instructor } from "../../../domain/entities/instructor.entity";
import { IInstructorRepository } from "../../../domain/repositories/instructor.repository";
import { CreateInstructorDTO } from "../../dtos/instructor.dto";
import { IEntityIdGenerator } from "../../interfaces/IEntityIdGenerator.interface";
import { IPassswordAdapter } from "../../interfaces/IPasswordAdapter.interface";

export class CreateInstructorUseCase {
    constructor(
        private readonly instructorRespository : IInstructorRepository,
        private readonly entityIdGenerator : IEntityIdGenerator,
        private readonly passwordAdapter : IPassswordAdapter
    ){}
    async execute(dto : CreateInstructorDTO) : Promise<Instructor> {
        const existingInstructor = await this.instructorRespository.getByEmail(dto.instructor_mail)
        if(existingInstructor !== null) throw new Error("Instructor mail already exists")
        const instructor_id = this.entityIdGenerator.generate("INSTRUCT")
        const password = await this.passwordAdapter.hash(dto.instructor_password)
        const instructor = new Instructor(
            dto.institution_id,
            instructor_id,
            dto.instructor_mail,
            password,
            null,
            dto.first_name,
            dto.last_name, 
            dto.age,
            dto.date_of_birth,
            dto.personal_email ,
            dto.about,
            false,
            "instructor",
            {
                title : dto.qualification.title,
                type : dto.qualification.type,
                institution : dto.qualification.institution,
                issue_date : dto.qualification.issue_date,
                document_url : dto?.qualification?.document_url ?? null
            }
        )

        await this.instructorRespository.create(instructor)
        return instructor
    }
}