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
    const result = await Request.post("category/create", newCategory);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteApiCategory = async (id: number) => {
  const response = await Request.delete<CategoryTs>(`category/${id}`);
  return response.data;
};

/* export const deleteApiCategoriesId = async (id: number | string) => {
  try {
    const res = await Request.delete<CategoryType>(`${id}`);
    return res;
  } catch (_) {
    console.log("error delete");
  }
};

export const postApiCreateCate = async (formData: object) => {
  try {
    const result = await Request.post<CreateCategoriesType>(`image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result;
  } catch (_) {
    console.log("Error postApiCreate");
  }
};

export const updateGetId = async (id: string | undefined): Promise<UpdateFormFace> => {
  const { data } = await Request.get<UpdateFormFace>(`${id}`);
  return data;
};
 */
