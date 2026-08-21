import { EndOtpVerificationUseCase } from "../../application/usecases/auth/endOtpVerification.usecase";
import { GoogleAuthAfterDobUseCase } from "../../application/usecases/auth/googleAuthAfterDob.usecase";
import { GoogleAuthBeforeDobUseCase } from "../../application/usecases/auth/googleAuthBeforeDob.usecase";
import { RegisterUserUseCase } from "../../application/usecases/auth/registerUser.usecase";
import { StartOtpVerificationUseCase } from "../../application/usecases/auth/startOtpVerification.usecase";
import { UpdateAndResendOtpUseCase } from "../../application/usecases/auth/updateAndResendOtp.usecase";
import { DobAndAgeValidator } from "../../infrastrucutre/adapters/DobAndAgeValidator.adapter";
import { MailService } from "../../infrastrucutre/adapters/MailService.adapter";
import { OtpGenerator } from "../../infrastrucutre/adapters/OtpGenerator.adapter";
import { PasswordAdapter } from "../../infrastrucutre/adapters/Password.adapter";
import { RegistrationIdGenerator } from "../../infrastrucutre/adapters/RegistrationIdGenerator.adapter";
import { EntityIdGenerator } from "../../infrastrucutre/adapters/EntityIdGenerator.adapter";
import { GoogleUserRepository } from "../../infrastrucutre/repositories/googleUser.repository";
import { InstitutionRepository } from "../../infrastrucutre/repositories/institution.repository";
import { OtpRepository } from "../../infrastrucutre/repositories/otp.repository";
import { UserRepository } from "../../infrastrucutre/repositories/user.repository";
import { AuthController } from "../controllers/auth.controller";
import { RegisterInstitutionUseCase } from "../../application/usecases/auth/registerInstitution.usecase";
import { VerifyLoginCredentialsUseCase } from "../../application/usecases/auth/verifyLoginCredentials.usecase";
import { InstructorRepository } from "../../infrastrucutre/repositories/instructor.repository";

export class AuthFactory {
  static create(): AuthController {
    const otpRepository = new OtpRepository();
    const userRepository = new UserRepository();
    const institutionRepository = new InstitutionRepository();
    const instructorRepository = new InstructorRepository();
    const passwordAdapter = new PasswordAdapter();
    const entityIdGenerator = new EntityIdGenerator();
    const otpGenerator = new OtpGenerator();
    const mailService = new MailService();
    const startOtpVerificationUseCase = new StartOtpVerificationUseCase(
      userRepository,
      institutionRepository,
      otpRepository,
      passwordAdapter,
      otpGenerator,
      mailService
    );
    const updateAndResendOtpUseCase = new UpdateAndResendOtpUseCase(
      otpRepository,
      otpGenerator,
      mailService
    );
    const registerUserUseCase = new RegisterUserUseCase(
      userRepository,
      entityIdGenerator
    );
    const registerInstitutionUseCase = new RegisterInstitutionUseCase(
      institutionRepository,
      entityIdGenerator
    );
    const endOtpVerificationUseCase = new EndOtpVerificationUseCase(
      otpRepository,
      registerInstitutionUseCase,
      registerUserUseCase,
      mailService
    );
    const googleUserRepository = new GoogleUserRepository();
    const registrationIdGenerator = new RegistrationIdGenerator();
    const googleAuthBeforeDobUseCase = new GoogleAuthBeforeDobUseCase(
      userRepository,
      googleUserRepository,
      registrationIdGenerator
    );
    const dobAndAgeValidator = new DobAndAgeValidator();
    const googleAuthAfterDobUseCase = new GoogleAuthAfterDobUseCase(
      googleUserRepository,
      registerUserUseCase,
      dobAndAgeValidator,
      mailService
    );
    const verifyLoginCredentials = new VerifyLoginCredentialsUseCase(
      userRepository,
      institutionRepository,
      instructorRepository,
      passwordAdapter
    );
    const controller = new AuthController(
      startOtpVerificationUseCase,
      updateAndResendOtpUseCase,
      endOtpVerificationUseCase,
      googleAuthBeforeDobUseCase,
      googleAuthAfterDobUseCase,
      verifyLoginCredentials
    );
    return controller;
  }
}
