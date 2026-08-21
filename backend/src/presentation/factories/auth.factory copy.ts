import { EndOtpVerificationUseCase } from "../../application/usecases/endOtpVerification.usecase";
import { GoogleAuthAfterDobUseCase } from "../../application/usecases/googleAuthAfterDob.usecase";
import { GoogleAuthBeforeDobUseCase } from "../../application/usecases/googleAuthBeforeDob.usecase";
import { RegisterUserUseCase } from "../../application/usecases/registerUser.usecase";
import { StartOtpVerificationUseCase } from "../../application/usecases/startOtpVerification.usecase";
import { UpdateAndResendOtpUseCase } from "../../application/usecases/updateAndResendOtp.usecase";
import { DobAndAgeValidator } from "../../infrastrucutre/adapters/DobAndAgeValidator.adapter";
import { MailService } from "../../infrastrucutre/adapters/MailService.adapter";
import { OtpGenerator } from "../../infrastrucutre/adapters/OtpGenerator.adapter";
import { PasswordHasher } from "../../infrastrucutre/adapters/PasswordHasher.adapter";
import { RegistrationIdGenerator } from "../../infrastrucutre/adapters/RegistrationIdGenerator.adapter";
import { EntityIdGenerator } from "../../infrastrucutre/adapters/EntityIdGenerator.adapter";
import { GoogleUserRepository } from "../../infrastrucutre/repositories/googleUser.repository";
import { InstitutionRepository } from "../../infrastrucutre/repositories/institution.repository";
import { OtpRepository } from "../../infrastrucutre/repositories/otp.repository";
import { UserRepository } from "../../infrastrucutre/repositories/user.repository";
import { AuthController } from "../controllers/auth.controller";
import { RegisterInstitutionUseCase } from "../../application/usecases/registerInstitution.usecase";

export class AuthFactory {
  static create(): AuthController {
    const otpRepository = new OtpRepository();
    const userRepository = new UserRepository();
    const institutionRepository = new InstitutionRepository()
    const passwordHasher = new PasswordHasher();
    const entityIdGenerator = new EntityIdGenerator();
    const otpGenerator = new OtpGenerator();
    const mailService = new MailService();
    const startOtpVerificationUseCase = new StartOtpVerificationUseCase(
      userRepository,
      institutionRepository,
      otpRepository,
      passwordHasher,
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
    const registerInstitutionUseCase = new RegisterInstitutionUseCase(institutionRepository,entityIdGenerator)
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
    const dobAndAgeValidator = new DobAndAgeValidator()
    const googleAuthAfterDobUseCase = new GoogleAuthAfterDobUseCase(
      googleUserRepository,
      registerUserUseCase,
      dobAndAgeValidator,
      mailService
    );
    const controller = new AuthController(
      startOtpVerificationUseCase,
      updateAndResendOtpUseCase,
      endOtpVerificationUseCase,
      googleAuthBeforeDobUseCase,
      googleAuthAfterDobUseCase
    );
    return controller;
  }
}
