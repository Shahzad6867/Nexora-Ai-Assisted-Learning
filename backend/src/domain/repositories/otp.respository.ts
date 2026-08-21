import { OtpEntity } from "../../application/dtos/otp.dto";

export interface IOtpRepository {
  save(otpUser: OtpEntity, expireDocumentIn : number): Promise<void>;

  findById(_id: string): Promise<OtpEntity | null>;

  delete(_id: string): Promise<void>;
}
