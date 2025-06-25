import type { ApiGetAllDishList } from "../mockup/dishlist";
import { axiosInstance } from "../utils/http";

export const getApiDishListAll = async () => {
  try {
    const result = await axiosInstance.get<ApiGetAllDishList>("dishlist");
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
