import type { CategoryTs } from "../mockup/categories";

export const getApiCategoriesAll = async () => {
  try {
    const result = await Request.get<CategoryTs>("category");
    console.log(result.data + "không có data")
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
