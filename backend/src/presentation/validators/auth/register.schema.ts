import z from "zod"
import { Roles } from "../../../domain/enums/roles.enum";

export const emailSchema = z.email("Invalid email address")
export const passwordSchema = z
  .string()
  .max(100, "Password cannot exceed 100 characters")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must include uppercase, lowercase, a number, and a special character")

  export const registerStudentSchema = z.object({
    first_name: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(40, "First name cannot exceed 40 characters"),
  
    last_name: z
      .string()
      .trim()
      .min(1, "Last name must be at least 2 characters")
      .max(40, "Last name cannot exceed 40 characters"),
  
    age: z
      .number()
      .int()
      .min(13, "Age must be at least 13"),
  
    date_of_birth: z
      .string()
      .min(1, "Date of birth is required"),
  
    email: emailSchema,
  
    password: passwordSchema,
  
    profile_image: z
      .string()
      .optional(),
  
    role: z.literal(Roles.STUDENT),
  });

  export const registerInstitutionSchema = z.object({
    email: emailSchema,
  
    password: passwordSchema,
  
    role: z.literal(Roles.INSTITUTION),
  });

  export const registerSchema = z.discriminatedUnion("role",[
    registerInstitutionSchema,
    registerStudentSchema
  ])