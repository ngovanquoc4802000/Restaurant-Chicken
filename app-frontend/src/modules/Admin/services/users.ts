import { UserAll, UsersTs } from "../types/users";
import { Request } from "../utils/http";
export const getUserAll = async () => {
  try {
    const result = await Request.get<UserAll>("user");
    return result.data;
  } catch (_) {
    return {
      success: false,
      message: "",
      data: [],
    };
  }
};

export const updateUser = async (id: number | null | undefined, user: UsersTs) => {
  try {
    const data = await Request.put<UsersTs>(`user/${id}`, user);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
