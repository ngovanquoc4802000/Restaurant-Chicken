import { useQueries } from "@tanstack/react-query"
import queriesCategories from "../queries/categories"
import queriesDishlist from "../queries/dishlist"

export const useMenuData = () => {
  const resultQueries = useQueries({
    queries: [
      {
        ...queriesCategories.list,
      },
      {
        ...queriesDishlist.list
      }
    ]
  })
  const category = resultQueries[0].data ?? [];

  const isLoading = resultQueries[0].isLoading;

  const error = resultQueries[0].error;

  const dishlist = resultQueries[1].data ?? [];

  const findComboGroup = dishlist.filter((item) => item.category_id === 5)
  return { category, isLoading, error, findComboGroup, dishlist }
}