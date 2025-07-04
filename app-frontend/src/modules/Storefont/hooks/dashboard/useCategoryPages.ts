import { useQueries } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import queriesCategories from "../../queries/categories";
import queriesDishlist from "../../queries/dishlist";
import { slugify } from "../../components/pages/dashboard/menu/ultils";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../components/pages/features/cartSlice";

export const useCategoryPages = () => {
  const setRef = useCallback(
    (slug: string) => (el: HTMLDivElement | null) => {
      if (el) refs.current[slug] = el;
    },
    []
  );

  const { id } = useParams();

  const resultOptions = useQueries({
    queries: [{ ...queriesCategories.list }, { ...queriesDishlist.list }],
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = (name: string) => {
    const slug = slugify(name);
    navigate(`/menu/${slug}`);

    const target = refs.current[slug];
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
  };

  const handleProductClick = (categoryId: string, productTitle: string) => {
    const slug = slugify(productTitle);
    navigate(`/menu/${categoryId}/${slug}`);
    const product = dishlist.find((item) => slugify(item.title) === slug);
    if (product) {
      dispatch(
        addToCart({
          id_dishlist: Number(product.id),
          quantity: 1,
          price: product.price,
          title: product.title,
          image: product.images?.[0]?.image || "",
          note: "",
        })
      );
    }
  };

  const categories = resultOptions[0].data ?? [];

  const dishlist = resultOptions[1].data ?? [];

  const isLoading = resultOptions.some((res) => res.isLoading);

  const isError = resultOptions.some((res) => res.error);

  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  return {
    categories,
    navigate,
    id,
    handleClick,
    handleProductClick,
    dishlist,
    isLoading,
    isError,
    refs,
    setRef,
  };
};
