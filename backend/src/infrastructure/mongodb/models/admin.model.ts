import {model,ObjectId,Schema} from "mongoose";
import { Roles } from "../../../domain/enums/roles.enum";

export interface IAdminDocument {
     _id : ObjectId,
     name : string,
     email : string,
     password : string | null,
     role : Roles.ADMIN,
     createdAt : Date,
     updatedAt : Date
}

const adminSchema = new Schema<IAdminDocument>({
    name : {
        type : String,
        required : true,
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
    role : {
        type : String,
        required : true,
        default : Roles.ADMIN
    },
},{
    timestamps : true
})

const AdminModel = model<IAdminDocument>("Admin",adminSchema)

export default AdminModel