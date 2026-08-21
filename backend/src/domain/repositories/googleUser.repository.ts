import { GoogleUser } from "../../application/dtos/user.dto";


export interface IGoogleUserRepository {
  save(googleUser : GoogleUser, expireDocumentIn : number): Promise<void>;

  findById(_id: string): Promise<GoogleUser | null>;

  delete(_id: string): Promise<void>;
}
