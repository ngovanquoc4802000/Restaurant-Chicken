import { ApiGetAllDishList, DishTs } from "../types/dishlist";
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

export const postApiDishlist = async (newDish: DishTs) => {
  try {
    const { data } = await Request.post<DishTs>("dishlist/create", newDish);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateApiDishList = async (id: number | undefined | null, update: DishTs) => {
  try {
    const result = await Request.put(`dishlist/${id}`, update);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
