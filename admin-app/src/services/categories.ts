import { CategoryType, CreateCategoriesType, UpdateFormFace } from "../types/categories";
import { RequestAxios } from "../utils/http";

export const getApiCategoriesAll = async () => {
  const { data } = await RequestAxios.get<CategoryType>("");
  return data;
};

export const deleteApiCategoriesId = async (id: number | string) => {
  const { data } = await RequestAxios.delete<CategoryType>(`${id}`);
  return data;
};

export const postApiCreateCate = async (formData: object) => {
  const { data } = await RequestAxios.post<CreateCategoriesType>(`image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateGetId = async (id: string | undefined) => {
  const { data } = await RequestAxios.put<UpdateFormFace>(`${id}`);
  return data;
};
