import { queryOptions } from "@tanstack/react-query";
import { getApiDishListAll } from "../services/dishlist";

const queriesDishlist = {
  list: queryOptions({
    queryKey: ["dishlist"],
    queryFn: async () => {
      const { success, data } = await getApiDishListAll();
      if (success) return data;
      return null;
    },
    staleTime: 1000 * 60 * 60,
  }),
};
export default queriesDishlist;
