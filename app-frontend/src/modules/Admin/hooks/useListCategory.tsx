import { useQuery } from "@tanstack/react-query";
import { useState, useCallback, useRef } from "react";
import queriesCategories from "../queries/categories";

export const useListCategory = () => {
  const [formState, setFormState] = useState<{
    showForm: boolean;
    isDetail?: number | undefined | null;
  }>({
    showForm: false,
    isDetail: null,
  });
  const [value, setValue] = useState<string>("");

  const [isInfomation, setIsInfomation] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  /* scroll */
  const { isLoading, error, data: categories } = useQuery({ ...queriesCategories.list });

  const handleEditClick = useCallback((id: number | undefined) => {
    setFormState((prev) => ({ ...prev, showForm: true, isDetail: id }));
  }, []);

  const handleHideModal = useCallback(() => {
    setFormState((prev) => ({ ...prev, showForm: false, isDetail: null }));
  }, []);
  const matchedName = categories?.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));

  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleScrollToCategory = (name: string) => {
    const target = refs.current[name];
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    console.log(target);
    setIsInfomation(false);
    setValue("");
  };
  return {
    refs,
    matchedName,
    handleScrollToCategory,
    value,
    setValue,
    setIsInfomation,
    isInfomation,
    handleChange,
    formState,
    setFormState,
    isLoading,
    error,
    categories,
    handleEditClick,
    handleHideModal,
  };
};
