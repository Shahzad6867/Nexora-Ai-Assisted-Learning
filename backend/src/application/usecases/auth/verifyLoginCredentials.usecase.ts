import jwt from "jsonwebtoken";
import { IInstitutionRepository } from "../../../domain/repositories/institution.repository";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { LoginCredentialsDTO } from "../../dtos/user.dto";
import env from "../../../config/env.config";
import { IPassswordAdapter } from "../../interfaces/IPasswordAdapter.interface";
import { IInstructorRepository } from "../../../domain/repositories/instructor.repository";


export class VerifyLoginCredentialsUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly institutionRepository: IInstitutionRepository,
    private readonly instructorRepository : IInstructorRepository,
    private readonly passwordAdapter: IPassswordAdapter
  ) {}
  async execute(dto: LoginCredentialsDTO): Promise<string> {
    let response = null
    console.log(dto)
    if (dto.role === "student") {
      const student = await this.userRepository.getByEmail(dto.email);
      if(!student){
        throw new Error("User does not exist, Please register")
      }
      if(student.is_blocked){
        throw new Error("User has been blocked by admin")
      }
      const isPassCorrect = await this.passwordAdapter.compare(dto.password,student.password!)
      if(!isPassCorrect){
        throw new Error("Incorrect Password")
      }

      response = student.student_id
    } else if (dto.role === "institution") {
        const institution = await this.institutionRepository.getByEmail(dto.email)
        if(!institution){
            throw new Error("Institution does not exist, Please register")
        }
        if(institution.isBlocked){
            throw new Error("Institution has been blocked by admin")
        }
        const isPassCorrect = await this.passwordAdapter.compare(dto.password,institution.password!)
        if(!isPassCorrect){
          throw new Error("Incorrect Password")
        }
        response = institution.institution_id
    } else if (dto.role === "instructor") {
      const instructor = await this.instructorRepository.getByEmail(dto.email);
      console.log(instructor)
      if(!instructor){
        throw new Error("Unauthorized user, Access restricted")
      }
      const isPassCorrect = await this.passwordAdapter.compare(dto.password,instructor.instructor_password!)
      if(!isPassCorrect){
        throw new Error("Incorrect Password")
      }
      response = instructor.instructor_id
    } else if (dto.role === "admin") {
      const admin = await this.userRepository.getByEmail(dto.email);
      if(!admin){
        throw new Error("Unauthorized user, Access restricted")
      }
      const isPassCorrect = await this.passwordAdapter.compare(dto.password,admin.password!)
      if(!isPassCorrect){
        throw new Error("Incorrect Password")
      }
      response = "Admin - Nexora"
    }
    const token = jwt.sign({_id : response,role : dto.role}, env.JWT_SECRET_KEY!, { expiresIn : "3h" });
    return token;
  }
}
