import { queryOptions } from "@tanstack/react-query";
import { getApiCategoriesAll } from "../services/categories";

const queriesCategories = {
  list: queryOptions({
    queryKey: ["categories"],
    queryFn: async () => {
      const { success, data } = await getApiCategoriesAll();
      if (success) return data;
      return null;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  }),
};

export default queriesCategories;
