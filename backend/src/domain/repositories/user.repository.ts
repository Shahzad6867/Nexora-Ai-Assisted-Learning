import { IUserDocument } from "../../infrastrucutre/mongodb/models/user.model";
import { User } from "../entities/user.entity";
export interface IUserRepository {
    getById : (student_id : string) => Promise<IUserDocument | null>
    getByEmail : (email : string) => Promise<IUserDocument | null>
    getAll : () => Promise<IUserDocument[]>
    update : (user : User) => Promise<User>
    create : (user : User) => Promise<IUserDocument>
}