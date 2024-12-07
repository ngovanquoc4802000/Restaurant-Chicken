import { CategoryType, CreateCategoriesType, UpdateFormFace } from "../types/categories";
import { Request } from "../utils/http";

export const getApiCategoriesAll = async (): Promise<CategoryType> => {
  const { data } = await Request.get<CategoryType>("");
  return data;
};

export const deleteApiCategoriesId = async (id: number | string): Promise<CategoryType> => {
  const { data } = await Request.delete<CategoryType>(`${id}`);
  return data;
};

export const postApiCreateCate = async (formData: object): Promise<CreateCategoriesType> => {
  const { data } = await Request.post<CreateCategoriesType>(`image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateCategoryId = async (id: string | undefined): Promise<UpdateFormFace> => {
  const { data } = await Request.get<UpdateFormFace>(`${id}`);
  return data;
};
