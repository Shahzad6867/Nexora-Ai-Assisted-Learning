import { IAdminRepository } from "../../domain/repositories/admin.repository";
import AdminModel, { IAdminDocument } from "../mongodb/models/admin.model";

export class AdminRepository implements IAdminRepository {
  async getByEmail(email: string) : Promise<IAdminDocument | null> {
    return await AdminModel.findOne({email});
  }
}
