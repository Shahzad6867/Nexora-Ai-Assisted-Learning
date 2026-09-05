import { IAdminDocument } from "../../infrastructure/mongodb/models/admin.model";
export interface IAdminRepository {
  getByEmail: (email: string) => Promise<IAdminDocument | null>;
}
