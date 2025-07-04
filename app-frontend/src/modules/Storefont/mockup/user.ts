export interface UserDataResponse {
  id: number;
  email: string;
  fullname: string;
  rule: "admin" | "customer" | null;
}

export interface UserLoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  data: UserDataResponse;
}

export interface LoginCredentials {
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
  checkbox?: boolean;
}

export interface UserAll {
  success: boolean;
  message: string;
  data: UsersTs[];
}
