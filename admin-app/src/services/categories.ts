import { CategoryTs, ValueCategory } from "../types/categories";
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

export const createApiCategory = async (newCategory: ValueCategory) => {
  try {
    const result = await Request.post<ValueCategory>("category/create", newCategory);
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const updateCategoryId = async (id: number | undefined | null, update: ValueCategory) => {
  const data = await Request.put(`category/${id}`, update);
  return data.data;
};

export const deleteApiCategory = async (id: number) => {
  const response = await Request.delete<CategoryTs>(`category/${id}`);
  return response.data;
};
