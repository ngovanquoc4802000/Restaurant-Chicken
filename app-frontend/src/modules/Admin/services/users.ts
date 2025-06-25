import { axiosInstance } from "$/modules/Storefont/utils/http";
import type { UserAll, UsersTs } from "../types/users";

export const getUserAll = async () => {
  try {
    const result = await axiosInstance.get<UserAll>("user");
    return result.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "",
      data: [],
    };
  }
};

export const updateUser = async (id: number | null | undefined, user: UsersTs) => {
  try {
    const data = await axiosInstance.put<UsersTs>(`user/${id}`, user);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
