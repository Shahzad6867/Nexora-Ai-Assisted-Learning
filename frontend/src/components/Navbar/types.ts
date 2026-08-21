
export type Role = "student" | "institution" | "instructor";

export interface RoleOption {
  role: Role;
  label: string;
  description: string;
  icon?: string;
}

export const LOGIN_ROLES: RoleOption[] = [
  { role: "student", label: "Student", description: "Access your courses and progress" },
  { role: "institution", label: "Institution", description: "Manage courses and enrollments", icon: "🏛" },
  { role: "instructor", label: "Instructor", description: "Manage your classes and content", icon: "🧑‍🏫" },
];

export const REGISTER_ROLES: RoleOption[] = [
  { role: "student", label: "Register as Student", description: "Start learning from trusted institutions", icon: "🎓" },
  { role: "institution", label: "Register as Institution", description: "Bring your programs to Nexora", icon: "🏛" },
];

export interface RolePopoverProps {
    triggerLabel: string;
    triggerClassName: string;
    options: RoleOption[];
}