import { axiosInstance } from "$/modules/Storefont/utils/http";
import type { ApiGetAllDishList, DishTs } from "../types/dishlist";

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

export const getApiDishlistId = async (id: number | null | undefined) => {
  try {
    const result = await axiosInstance.get<ApiGetAllDishList>(`dishlist/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const postApiDishlist = async (newDish: DishTs) => {
  try {
    const { data } = await axiosInstance.post<DishTs>("dishlist/create", newDish);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateApiDishList = async (id: number | undefined | null, update: DishTs) => {
  try {
    const result = await axiosInstance.put(`dishlist/${id}`, update);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
