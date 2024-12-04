import { CategoryType } from "../types/categories";
import { Request } from "../utils/http";
export const getApiAll = async () => {
  try {
    await Request.get<CategoryType>("");
  } catch (error) {}
};
