import { CategoryType, CreateCategoriesType } from "../types/categories";
import { Request } from "../utils/http";

export const getApiCategoriesAll = async () => {
  try {
    const result = await Request.get<CategoryType>("");
    return result.data;
  } catch (_) {
    console.log("error");
  }
};

export const deleteApiCategoriesId = async (id: number | string) => {
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
