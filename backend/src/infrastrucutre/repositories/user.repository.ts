import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/user.repository";
import UserModel, { IUserDocument } from "../mongodb/models/user.model";

export class UserRepository implements IUserRepository {
  async getAll() {
    return await UserModel.find({});
  }
  async getById(student_id: string) {
    return await UserModel.findOne({student_id});
  }
  async getByEmail(email: string) : Promise<IUserDocument | null> {
    return await UserModel.findOne({ email });
  }
  async create(user: User): Promise<IUserDocument> {
    const newUser = await UserModel.create({
      student_id: user.student_id,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      date_of_birth: user.date_of_birth,
      email: user.email,
      password : user.password ?? null,
      profile_image : user.profile_image,
      is_blocked: user.is_blocked,
      role : user.role,
      google_id : user.google_id ?? null
    });
    return newUser;
  }
  async update(user: User) : Promise<User> {
    await UserModel.findOneAndUpdate({student_id : user.student_id}, user);
    return user;
  }
}
