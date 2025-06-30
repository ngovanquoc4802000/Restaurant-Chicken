import { axiosInstance, Request } from "$/modules/Storefont/utils/http";
import type { CategoryTs, ValueCategory } from "../types/categories";

export const getApiCategoriesAll = async () => {
  try {
    const result = await Request.get<CategoryTs>("category");
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

export const createApiCategory = async (newCategory: ValueCategory) => {
  try {
    const result = await axiosInstance.post<ValueCategory>("category/create", newCategory);
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const updateCategoryId = async (id: number | undefined | null, update: ValueCategory) => {
  const data = await axiosInstance.put(`category/${id}`, update);
  return data.data;
};

export const deleteApiCategory = async (id: number) => {
  const response = await axiosInstance.delete<CategoryTs>(`category/${id}`);
  return response.data;
};
