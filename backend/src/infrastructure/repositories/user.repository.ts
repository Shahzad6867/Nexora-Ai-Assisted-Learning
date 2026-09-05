import { User } from "../../domain/entities/user.entity";
import { Roles } from "../../domain/enums/roles.enum";
import { SortBy } from "../../domain/enums/sortBy.enum";
import { IUserRepository } from "../../domain/repositories/user.repository";
import UserModel, { IUserDocument } from "../mongodb/models/user.model";
import { BaseRepository } from "./base/base.repository";

export class UserRepository extends BaseRepository<IUserDocument> implements IUserRepository {
  async getAll(
    sortBy: SortBy,
    skip?: number,
    itemsPerPage?: number,
    search?: string
  ) {
    let sortQuery: Record<string, 1 | -1> = { createdAt: -1 };
    if (sortBy === SortBy.NEWEST) {
      sortQuery = { createdAt: -1 };
    } else if (sortBy === SortBy.OLDEST) {
      sortQuery = { createdAt: 1 };
    } else if (sortBy === SortBy.NAMEASC) {
      sortQuery = { first_name: 1 };
    } else if (sortBy === SortBy.NAMEDESC) {
      sortQuery = { first_name: -1 };
    }
    if (
      search !== undefined &&
      skip !== undefined &&
      itemsPerPage !== undefined
    ) {
      return await UserModel.find({
        $or: [
          { first_name: { $regex: search, $options: "i" } },
          { last_name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { student_id: { $regex: search, $options: "i" } },
        ],
      })
        .sort(sortQuery)
        .skip(skip)
        .limit(itemsPerPage);
    }
    if (skip !== undefined && itemsPerPage !== undefined) {
      return await UserModel.find({}).sort(sortQuery).skip(skip).limit(itemsPerPage);
    }
    return await UserModel.find({}).sort(sortQuery);
  }
  async getById(student_id: string) {
    return await UserModel.findOne({ student_id });
  }
  async getByEmail(
    email: string,
    role?: Roles.STUDENT
  ): Promise<IUserDocument | null> {
    const query = role
      ? {
          email,
          role,
        }
      : { email };
    return await UserModel.findOne(query);
  }
  async create(user: User): Promise<IUserDocument> {
    const newUser = await UserModel.create({
      student_id: user.student_id,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      date_of_birth: user.date_of_birth,
      email: user.email,
      password: user.password ?? null,
      profile_image: user.profile_image,
      is_blocked: user.is_blocked,
      role: user.role,
      google_id: user.google_id ?? null,
    });
    return newUser;
  }
  async update(student_id : string,user: User): Promise<IUserDocument | null> {
    return await UserModel.findOneAndUpdate({ student_id }, user);
  }
}
