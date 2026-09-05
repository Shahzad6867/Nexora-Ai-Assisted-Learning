import { IUserDocument } from "../../infrastructure/mongodb/models/user.model";
import { User } from "../entities/user.entity";
import { SortBy } from "../enums/sortBy.enum";
export interface IUserRepository {
  getById: (student_id: string) => Promise<IUserDocument | null>;
  getByEmail: (email: string) => Promise<IUserDocument | null>;
  getAll: (
    sortBy: SortBy,
    skip?: number,
    itemsPerPage?: number,
    search?: string
  ) => Promise<IUserDocument[]>;
  update: (student_id : string,user: User) => Promise<IUserDocument | null>;
  create: (user: User) => Promise<IUserDocument>;
}
