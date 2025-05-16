export interface UserAll {
  success: boolean;
  message: string;
  data: UsersTs[];
}

export interface UserLoginTs {
  email: string;
  password: string;
  success?: boolean;
  message?: string;
}

export interface UsersTs {
  id?: number;
  fullname: string;
  email: string;
  phone_number: string;
  address: string;
  password: string; // lưu hashed password trong thực tế
  create_at: Date;
  update_at?: Date;
  status?: boolean | number;
}
