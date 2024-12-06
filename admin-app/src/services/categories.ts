import { CategoryType, CreateCategoriesType, UpdateFormFace } from "../types/categories";
import { Request } from "../utils/http";

export const getApiCategoriesAll = async () => {
  const result = await Request.get<CategoryType>("");
  return result.data;
};

export const deleteApiCategoriesId = async (id: number | string) => {
  const res = await Request.delete<CategoryType>(`${id}`);
  return res;
};

export const postApiCreateCate = async (formData: object) => {
  const result = await Request.post<CreateCategoriesType>(`image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result;
};

export const updateGetId = async (id: string | undefined): Promise<UpdateFormFace> => {
  const { data } = await Request.get<UpdateFormFace>(`${id}`);
  return data;
};
