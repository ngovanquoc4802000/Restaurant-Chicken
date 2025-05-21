import { useCallback, useRef } from "react";
import { useQueries } from "@tanstack/react-query";
import queriesCategories from "../queries/categories";
import queriesDishlist from "../queries/dishlist";

export const useMenuPages = () => {
  const resultOptions = useQueries({
    queries: [
      { ...queriesCategories.list },
      { ...queriesDishlist.list },
    ]
  });

  const categories = resultOptions[0].data ?? [];

  const dishlist = resultOptions[1].data ?? [];
  
  const isLoading = resultOptions.some((res) => res.isLoading);

  const isError = resultOptions.some((res) => res.error);
  
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const setRef = useCallback(
    (slug: string) => (el: HTMLDivElement | null) => {
      if (el) refs.current[slug] = el;
    },
    []
  );
  return { categories, dishlist, isLoading,isError , refs,setRef }
}