// src/mockup/user.ts (hoặc file định nghĩa interfaces của bạn)

// Interface cho dữ liệu người dùng được trả về sau khi đăng nhập thành công (phần 'data' của response)
export interface UserDataResponse {
  id: number; // ID người dùng (luôn có khi đăng nhập thành công)
  email: string;
  fullname: string;
  rule: string | null; // Có thể là null như API của bạn đang trả về
}

// Interface cho toàn bộ phản hồi từ API đăng nhập
export interface UserLoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  data: UserDataResponse; // Sử dụng UserDataResponse cho phần data
}

// Interface cho payload gửi đi khi đăng nhập (email và password)
export interface LoginCredentials {
  // Đổi tên từ LoggedInUser sang LoginCredentials cho rõ ràng
  id?: number;
  email: string;
  password: string;
}

// Interface cho dữ liệu người dùng đầy đủ (có thể dùng khi tạo user mới hoặc get all users)
// (Giữ nguyên UsersTs của bạn)
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
  // Bạn có thể thêm 'rule' vào đây nếu cột 'rule' cũng tồn tại trong bảng 'user' đầy đủ
  // rule?: string | null;
}

// Interface cho phản hồi khi lấy tất cả người dùng
// (Giữ nguyên UserAll của bạn)
export interface UserAll {
  success: boolean;
  message: string;
  data: UsersTs[];
}
