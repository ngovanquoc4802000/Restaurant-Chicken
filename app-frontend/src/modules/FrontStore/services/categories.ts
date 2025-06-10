import type { CategoryTs } from "../mockup/categories";
import { Request } from "../utils/http";

export const getApiCategoriesAll = async () => {
  try {
    const result = await Request.get<CategoryTs>("category");
    return result.data;
  } catch (_) {
    return {
      success: false,
      message: "",
      data: [],
    };
  }
};