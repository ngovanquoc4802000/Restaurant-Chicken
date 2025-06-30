import { useQueries } from "@tanstack/react-query";
import queriesCategories from "../../queries/categories";
import queriesDishlist from "../../queries/dishlist";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useRef } from "react";
import { slugify } from "../../components/pages/dashboard/menu/ultils";

export const useMenuPages = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const resultOptions = useQueries({
    queries: [{ ...queriesCategories.list }, { ...queriesDishlist.list }],
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
  const handleClick = (name: string) => {
    const slug = slugify(name);

    navigate(`/menu-page/${slug}`);

    const target = refs.current[slug];

    if (target) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
    }
  };
  const handleProductClick = (categoryId: string, productTitle: string) => {
    const slug = slugify(productTitle);
    navigate(`/menu-page/${categoryId}/${slug}`);
  };
  return {
    handleProductClick,
    handleClick,
    id,
    navigate,
    categories,
    dishlist,
    isLoading,
    isError,
    refs,
    setRef,
  };
};
