import { ApiGetAllDishList } from "../types/dishlist";
import { Request } from "../utils/http";

export const getApiDishListAll = async () => {
  try {
    const result = await Request.get<ApiGetAllDishList>("dishlist");
    return result.data;
  } catch (_) {
    return {
      success: false,
      message: "",
      data: [],
    };
  }
};

/* export const postApiDishlist = async (newDish: Omit<DishTs, "id">) => {
  try {
    const { data } = await Request.post<DishTs>("dishlist/create", newDish);
    return data;
  } catch (error) {
    console.log(error);
  }
}; */
