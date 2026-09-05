import {Document, model,ObjectId,Schema} from "mongoose";
import { Roles } from "../../../domain/enums/roles.enum";

export interface IUserDocument extends Document{
     student_id : string,
     first_name : string,
     last_name : string,
     age : number,
     date_of_birth : Date,
     email : string,
     password : string | null,
     profile_image : string | null,
     is_blocked : boolean,
     role : Roles.STUDENT,
     google_id ?: string | null,
     createdAt : Date,
     updatedAt : Date
}

const userSchema = new Schema<IUserDocument>({
    student_id : {
        type : String,
        required : true,
        unique : true
    },
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    date_of_birth : {
        type : Date,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : false,
        default : null
    },
    profile_image : {
        type : String,
        default : null
    },
    is_blocked : {
        type : Boolean,
        required : true,
        default : false
    },
    role : {
        type : String,
        required : true,
        default : Roles.STUDENT
    },
    google_id : {
      type : String,
      required : false,
      default : null
    }
},{
    timestamps : true
})

const UserModel = model<IUserDocument>("User",userSchema)

export default UserModel