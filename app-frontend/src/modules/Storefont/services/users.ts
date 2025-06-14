import type { LoginCredentials, UserLoginResponse, UsersTs } from "../mockup/user";
import { Request } from "../utils/http";

export const createUsersRegister = async (user: UsersTs) => {
  try {
    const result = await Request.post<UsersTs>("user/register", user);
    return result.data;
  } catch (error) {
    if (!error || error) {
      throw { response: { data: { message: error || "Login failed" } } };
    }
  }
}
export const createUserLogin = async (login: LoginCredentials) => {
  try {
    const result = await Request.post<UserLoginResponse>("user/login", login);
    if (result?.data.success === false) {
      throw new Error(result.data.message || "Email hoặc mật khẩu không đúng.");
    }
    return result.data; 
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Chi tiết lỗi:", error.message);
    } else {
      console.error("Chi tiết lỗi không xác định:", error);
    }
    throw new Error("Lỗi kết nối đến máy chủ.");
  }
};

