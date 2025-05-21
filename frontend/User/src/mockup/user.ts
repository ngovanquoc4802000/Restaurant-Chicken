export interface UserAll {
  success: boolean;
  message: string;
  data: UsersTs[];
}
export interface UserLoginResponse {
  success: boolean;
  message: string;
  data: LoggedInUser;
}

export interface LoggedInUser {
  id?: number;
  email: string;
  password: string;
}
export interface UsersTs {
  id?: number;
  fullname: string;
  email: string;
  phone_number: string;
  address: string;
  password: string; 
  create_at: Date;
  update_at?: Date;
  status?: boolean | number;
}
