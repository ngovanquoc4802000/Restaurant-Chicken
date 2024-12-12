import { UpdateFormDish } from "../types/dishlist";
import { RequestAxios } from "../utils/http";

export const updateDishListId = async (id: string | undefined) => {
  const { data } = await RequestAxios.get<UpdateFormDish>(`${id}`);
  return data;
};
