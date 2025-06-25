import type { CategoryTs } from "../mockup/categories";
import { axiosInstance } from "../utils/http";

export const getApiCategoriesAll = async () => {
  try {
    const result = await axiosInstance.get<CategoryTs>("category");
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
