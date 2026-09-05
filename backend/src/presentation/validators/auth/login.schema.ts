import z from "zod";
import { emailSchema, passwordSchema } from "./register.schema";
import { Roles } from "../../../domain/enums/roles.enum";


export const loginSchema = z.object({
    email : emailSchema,
    password : passwordSchema,
    role : z.enum(Roles,{
        error : "Unauthorized Access"
    })
})