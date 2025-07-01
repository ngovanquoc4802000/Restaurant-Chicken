import { useCallback, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type Image from "../types/dishlist";
import queriesCategories from "../queries/categories";
import queriesDishlist from "../queries/dishlist";

interface DishlistTs {
  showForm: boolean;
  showOrder: boolean;
  idDetail: number | null | undefined;
  selectedDetails: Image[] | null;
}
export const useDishlist = () => {
  const [dishState, setDishState] = useState<DishlistTs>({
    showForm: false,
    showOrder: false,
    idDetail: null,
    selectedDetails: null,
  });
  const [value, setValue] = useState<string>("");

  const { isLoading, isError, data: dishlist } = useQuery({ ...queriesDishlist.list });

  const { data: categories } = useQuery({ ...queriesCategories.list });

  const categoryMap = useMemo(() => {
    const map = new Map();
    categories?.forEach((cat) => map.set(cat.id, cat.name));
    return map;
  }, [categories]);

  const getCategoryName = useCallback((id: string | number) => categoryMap.get(id) || "undefined", [categoryMap]);

  const handleEdit = useCallback((id: number | null | undefined) => {
    setDishState((prev) => ({ ...prev, showForm: true, idDetail: id }));
  }, []);

  const handleHideModal = useCallback(() => {
    setDishState((prev) => ({ ...prev, showForm: false, idDetail: null }));
  }, []);

  const handleDetail = useCallback((images: Image[]) => {
    setDishState((prev) => ({
      ...prev,
      showOrder: true,
      selectedDetails: images,
    }));
  }, []);
  const handleHideDetail = useCallback(() => {
    setDishState((prev) => ({
      ...prev,
      showOrder: false,
      selectedDetails: null,
    }));
  }, []);
  const sortedDishlist = dishlist?.sort((a, b) => {
    return Number(a.id) - Number(b.id);
  });
  /* scroll */
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleScrollToCategory = (name: string) => {
    const target = refs.current[name];
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    setIsInfomation(false);
    setValue("");
  };

  const [isInfomation, setIsInfomation] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    setIsInfomation,
    handleChange,
    handleScrollToCategory,
    isInfomation,
    refs,

    sortedDishlist,
    getCategoryName,
    categories,
    isLoading,
    isError,
    dishlist,
    handleEdit,
    handleDetail,
    handleHideDetail,
    handleHideModal,
    dishState,
    setDishState,
  };
};
