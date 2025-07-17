import type { LoginCredentials, UserAll, UserLoginResponse, UsersTs } from "../mockup/user";
import { Request } from "../utils/http";

export const getUserRegister = async () => {
  try {
    const result = await Request.get<UserAll>("user");
    return result.data;
  } catch (error) {
    if (!error || error) {
      throw { response: { data: { message: error || "Login failed" } } };
    }
  }
};

export const createUsersRegister = async (user: UsersTs) => {
  try {
    const result = await Request.post<UsersTs>("user/register", user);
    return result.data;
  } catch (error) {
    if (!error || error) {
      throw { response: { data: { message: error || "Login failed" } } };
    }
  }
};

export const createUserLogin = async (login: LoginCredentials) => {
  try {
    const result = await Request.post<UserLoginResponse>("user/login", login);
    if (!result) {
      console.log("No create user login");
    }
    if (result.data.success === false) {
      throw new Error(result.data.message || "Email or Password Error.");
    }
    return result.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Details Error:", error.message);
    } else {
      console.error("Details Null:", error);
    }
    throw new Error("Error connect server.");
  }
};
