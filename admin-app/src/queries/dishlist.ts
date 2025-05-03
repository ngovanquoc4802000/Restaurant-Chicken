import { queryOptions } from "@tanstack/react-query";
import { getApiDishListAll, getApiDishlistId } from "../services/dishlist";

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
  detail: (id: number | null | undefined) =>
    queryOptions({
      queryKey: ["dishlist", id],
      queryFn: async () => {
        const result = await getApiDishlistId(id);
        const data = result?.data?.data;
        if (Array.isArray(data)) return data[0];
        return data;
      },
      staleTime: 1000 * 60 * 5,
    }),
};

export default queriesDishlist;
