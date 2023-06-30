export interface User {
  id?: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
}
export interface UserIds {
  userIds?: User[];
}

export interface Inputs {
  userId?: string;
  password?: string;
  confirmPassword?: string;
  userName?: string;
  userEmail?: string;
  token?: string;
}