import type { ApiGetAllDishList } from "../mockup/dishlist";
import { Request } from "../utils/http";

export const getApiDishListAll = async () => {
  try {
    const result = await Request.get<ApiGetAllDishList>("dishlist");
    return result.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return {
      success: false,
      message: "",
      data: [],
    };
  }
};