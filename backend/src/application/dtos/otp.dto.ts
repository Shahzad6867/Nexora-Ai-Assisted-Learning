import { RegisterInstitutionDTO } from "./institution.dto";
import { RegisterUserDTO } from "./user.dto";

export interface OtpResponseDTO {
  _id: string;
  otp: string;
  otpExpiresAt: Date;
}
export interface ResendOtpRequestDTO {
  _id: string;
}
export interface VerifyOtpRequestDTO {
  otpTyped: string;
  otpDetails: {
    _id: string;
    otp: string;
    otpExpiresAt: Date;
  };
}
export interface OtpEntity {
  _id: string;
  data: RegisterUserDTO | RegisterInstitutionDTO;
  otp: string;
  otpExpiresAt: Date;
}

export interface RegisterOtpUserDTO {
  first_name: string;
  last_name: string;
  age: number;
  date_of_birth: string;
  email: string;
  password: string;
  profile_image: string | null;
  role : string
}
export interface RegisterOtpInstitutionDTO {
  email: string;
  password: string;
  role: string;
}
