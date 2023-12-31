import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from "react-hook-form";

export interface User {
  id?: number;
  userId?: string;
  userEmail?: string;
  userName?: string;
  isAdmin : string | null;
}
export interface UserIds {
  userIds?: User[];
}

export interface RegisterInputs {
  userId?: string;
  password?: string;
  confirmPassword?: string;
  userName?: string;
  userEmail?: string;
  token?: string;
}

export interface UserInfoInputProps {
  type: string;
  inputName: string;
  register: UseFormRegisterReturn;
  watch?:  string;
  bold?: boolean;
  small?: boolean;
  errColor?: boolean;
  errors?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}