import { EndOtpVerificationUseCase } from "../../application/usecases/auth/endOtpVerification/endOtpVerification.usecase";
import { GoogleAuthAfterDobUseCase } from "../../application/usecases/auth/googleAuthAfterDob/googleAuthAfterDob.usecase";
import { GoogleAuthBeforeDobUseCase } from "../../application/usecases/auth/googleAuthBeforeDob/googleAuthBeforeDob.usecase";
import { RegisterUserUseCase } from "../../application/usecases/auth/registerUser/registerUser.usecase";
import { StartOtpVerificationUseCase } from "../../application/usecases/auth/startOtpVerification/startOtpVerification.usecase";
import { UpdateAndResendOtpUseCase } from "../../application/usecases/auth/updateAndResendOtp/updateAndResendOtp.usecase";
import { DobAndAgeValidator } from "../../infrastructure/adapters/DobAndAgeValidator.adapter";
import { MailService } from "../../infrastructure/adapters/MailService.adapter";
import { OtpGenerator } from "../../infrastructure/adapters/OtpGenerator.adapter";
import { PasswordAdapter } from "../../infrastructure/adapters/Password.adapter";
import { RegistrationIdGenerator } from "../../infrastructure/adapters/RegistrationIdGenerator.adapter";
import { EntityIdGenerator } from "../../infrastructure/adapters/EntityIdGenerator.adapter";
import { GoogleUserRepository } from "../../infrastructure/repositories/googleUser.repository";
import { InstitutionRepository } from "../../infrastructure/repositories/institution.repository";
import { OtpRepository } from "../../infrastructure/repositories/otp.repository";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { AuthController } from "../controllers/auth.controller";
import { RegisterInstitutionUseCase } from "../../application/usecases/auth/registerInstitution/registerInstitution.usecase";
import { VerifyLoginCredentialsUseCase } from "../../application/usecases/auth/verifyLoginCredentials/verifyLoginCredentials.usecase";
import { InstructorRepository } from "../../infrastructure/repositories/instructor.repository";
import { AdminRepository } from "../../infrastructure/repositories/admin.repository";
import UserModel from "../../infrastructure/mongodb/models/user.model";
import InstructorModel from "../../infrastructure/mongodb/models/instructor.model";
import InstitutionModel from "../../infrastructure/mongodb/models/institution.model";
import { TokenGenerator } from "../../infrastructure/adapters/TokenGenerator.adapter";
import { CreateAccessTokenUseCase } from "../../application/usecases/auth/createAccessToken/createAccessToken.usecase";

export class AuthFactory {
  static create(): AuthController {
    const adminRepository = new AdminRepository();
    const userRepository = new UserRepository(UserModel);
    const institutionRepository = new InstitutionRepository(InstitutionModel);
    const instructorRepository = new InstructorRepository(InstructorModel);
    const otpRepository = new OtpRepository();
    const dobAndAgeValidator = new DobAndAgeValidator();
    const passwordAdapter = new PasswordAdapter();
    const entityIdGenerator = new EntityIdGenerator();
    const otpGenerator = new OtpGenerator();
    const mailService = new MailService();
    const tokenGenerator = new TokenGenerator()
    const createAccessTokenUseCase = new CreateAccessTokenUseCase()
    const startOtpVerificationUseCase = new StartOtpVerificationUseCase(
      userRepository,
      institutionRepository,
      otpRepository,
      dobAndAgeValidator,
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
      mailService,
      tokenGenerator
    );
    const googleUserRepository = new GoogleUserRepository();
    const registrationIdGenerator = new RegistrationIdGenerator();
    const googleAuthBeforeDobUseCase = new GoogleAuthBeforeDobUseCase(
      userRepository,
      googleUserRepository,
      registrationIdGenerator,
      tokenGenerator
    );
    const googleAuthAfterDobUseCase = new GoogleAuthAfterDobUseCase(
      googleUserRepository,
      registerUserUseCase,
      dobAndAgeValidator,
      mailService,
      tokenGenerator
    );
    const verifyLoginCredentials = new VerifyLoginCredentialsUseCase(
      userRepository,
      adminRepository,
      institutionRepository,
      instructorRepository,
      passwordAdapter,
      tokenGenerator
    );
    const controller = new AuthController(
      startOtpVerificationUseCase,
      updateAndResendOtpUseCase,
      endOtpVerificationUseCase,
      googleAuthBeforeDobUseCase,
      googleAuthAfterDobUseCase,
      verifyLoginCredentials,
      createAccessTokenUseCase
    );
    return controller;
  }
}
