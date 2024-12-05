import { CategoryType } from "../types/categories";
import { Request } from "../utils/http";

export const getApiAll = async () => {
  try {
    const result = await Request.get<CategoryType>("");
    return result.data;
  } catch (_) {
    console.log("error");
  }
};

export const deleteApiId = async (id: number | string) => {
  try {
    const res = await Request.delete<CategoryType>(`${id}`);
    return res;
  } catch (_) {
    console.log("error delete");
  }
};
