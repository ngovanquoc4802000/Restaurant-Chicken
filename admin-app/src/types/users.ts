export interface UserAll {
  success: boolean;
  message: string;
  data: UsersTs[];
}

export interface UsersTs {
  id: number;
  fullname: string;
  email: string;
  phone_number?: string;
  address?: string;
  password: string; // lưu hashed password trong thực tế
  create_at: string;
  update_at: string;
}
