export interface RegisterUserDTO {
  first_name: string;
  last_name: string;
  age: number;
  date_of_birth: string;
  email: string;
  password: string | null;
  profile_image: string | null;
  role: string;
  google_id?: string | null;
}
export interface RegisterUserResponseDTO {
  student_id: string;
  first_name: string;
  last_name: string;
  age: number;
  date_of_birth: Date;
  email: string;
  profile_image: string | null;
  role: string;
  is_blocked: boolean;
}

export interface GoogleUserDTO {
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string | null;
  google_id: string;
  role?: string;
}
export interface GoogleUserDobDTO {
  _id: string;
  date_of_birth: string;
  age: number;
}

export interface GoogleUser {
  _id: string;
  data: GoogleUserDTO;
}

export interface LoginCredentialsDTO {
  email: string;
  password: string;
  role: string;
}
